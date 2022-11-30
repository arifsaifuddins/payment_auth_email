import { core } from "../utils/payment.js"
import Payment from "../models/donate.js"

export const eBankMoney = async (req, res) => {

  const { type, description, username, email, phone, amount, user_id } = req.body

  if (type == "bni" || type == "bri" || type == "permata") {

    // bank transfer (bni/bri/permata)
    const parameter = {
      payment_type: "bank_transfer",
      bank_transfer: {
        bank: type
      },
      customer_details: {
        email,
        phone,
        first_name: username,
        last_name: type,
      },
      transaction_details: {
        order_id: type + Date.now() + Math.ceil(Math.random() * 99999) + 1,
        gross_amount: amount
      }
    }

    await core.charge(parameter).then(async chargeResponse => {
      const transfer = new Payment({
        amount,
        user_id,
        order_id: chargeResponse.order_id,
        payment_type: type,
        payment_code: type == 'permata' ? chargeResponse.permata_va_number : chargeResponse.va_numbers[0].va_number,
        transaction_id: chargeResponse.transaction_id,
        transaction_time: chargeResponse.transaction_time,
        transaction_status: chargeResponse.transaction_status,
        description,
        message: 'The payment token will be expired after day of transaction time',
      })

      return await Payment.find({ order_id: chargeResponse.order_id }).then(async order => {
        if (!order[0]) {
          return await transfer.save().then(result => {
            res.status(201).json({
              code: 201,
              message: 'Generate token has successfuly!',
              data: result
            })
          }).catch(err => {
            res.status(500).json({
              code: 500,
              error: err
            })
          })
        } else {
          res.status(500).json({
            code: 500,
            error: 'Order exits!'
          })
        }
      }).catch(err => {
        res.status(500).json({
          code: 500,
          error: err
        })
      })
    }).catch(err => {
      res.status(500).json({
        code: 500,
        error: err
      })
    })

  } else if (type == "gopay") {

    // emoney (gopay)
    const parameter = {
      payment_type: type,
      customer_details: {
        email,
        phone,
        first_name: username,
        last_name: type,
      },
      transaction_details: {
        order_id: type + Date.now() + Math.ceil(Math.random() * 99999) + 1,
        gross_amount: amount
      }
    }

    await core.charge(parameter).then(async chargeResponse => {
      const gopay = new Payment({
        amount,
        user_id,
        order_id: chargeResponse.order_id,
        payment_type: chargeResponse.payment_type,
        transaction_id: chargeResponse.transaction_id,
        transaction_time: chargeResponse.transaction_time,
        transaction_status: chargeResponse.transaction_status,
        description,
        message: 'The payment token will be expired after 15 seconds of transaction time',
        url_action: chargeResponse.actions[1].url,
        qrcode_action: chargeResponse.actions[0].url,
      })

      return await Payment.find({ order_id: chargeResponse.order_id }).then(async order => {
        if (!order[0]) {
          return await gopay.save().then(result => {
            res.status(201).json({
              code: 201,
              message: 'Generate token has successfuly!',
              data: result
            })
          }).catch(err => {
            res.status(500).json({
              code: 500,
              error: err
            })
          })
        } else {
          res.status(500).json({
            code: 500,
            error: 'Order exits!'
          })
        }
      }).catch(err => {
        res.status(500).json({
          code: 500,
          error: err
        })
      })
    }).catch(err => {
      res.status(500).json({
        code: 500,
        error: err
      })
    })

  } else {
    res.status(404).json({
      code: 404,
      error: "Payment method inputted not found!"
    })
  }
}
