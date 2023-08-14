const dotenv = require("dotenv");
dotenv.config();
const appId = process.env.one_signal_appID;
const apiKey = process.env.one_signal_ApiKey;
const pushNotificationService = require("./notificationservice");

exports.SendBuyNotification = (req, res, next) => {
  var message = {
    app_id: appId,
    contents: { en: "A User Just Bought an Item. It's your turn To buy your's an amazing gift..." },
    included_segments: ["All"],
    content_available: true,
    small_icon: "ic_notification_icon",
    data: {
      PushTitle: "Pet Sansar",
    },
  };

  pushNotificationService.sendNotification(message, (error, results) => {
    if (error) {
      return next(error);
    }
     res.status(200).send({
      message: "success",
      data: results,
    });
  });
};

exports.SendorderPlaceNotification = (req, res, next) => {
  var message = {
    app_id: appId,
    contents: { en: "Order Placed Successfully. Shop More" },
    include_player_ids: [req.body.devices],
    content_available: true,
    small_icon: "ic_notification_icon",
    data: {
      PushTitle: "Pet Sansar",
    },
  };

  pushNotificationService.sendNotification(message, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: "success",
      data: results,
    });
  });
};

exports.SendCustomNotification = (req, res, next) => {
    var message = {
      app_id: appId,
      contents: { en: req.body.content },
      included_segments: ["All"],
      content_available: true,
      small_icon: "ic_notification_icon",
      data: {
        PushTitle: "Pet Sansar",
      },
    };
  
    pushNotificationService.sendNotification(message, (error, results) => {
      if (error) {
        return next(error);
      }
      return res.status(200).send({
        message: "success",
        data: results,
      });
    });
  };
