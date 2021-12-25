const Accomodation = require("../models/Accomodation");

exports.create = async (req, res) => {
  try {
    const {
      userId,
      title,
      images,
      location,
      price,
      description,
      features,
      renewal,
    } = req.body;

    const createAccomodationData = {
      userId,
      title,
      images,
      location,
      price,
      description,
      features,
      renewal,
    };
    const newAccomodation = await Accomodation.create(createAccomodationData);
    newAccomodation.save();
    return res.status(200).json({
      message: newAccomodation,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllAccomodations = async (req, res) => {
  const latestQuery = req.query.latest;
  const featureQuery = req.query.feature;
  try {
    let accomodations;

    if (latestQuery) {
      accomodations = await Accomodation.find().sort({ date: -1 }).limit(6);
      return res.status(200).json({
        message: accomodations,
      });
    } else if (featureQuery) {
      accomodations = await Accomodation.find({
        features: {
          $in: [featureQuery],
        },
      });

      return res.status(200).json({
        message: accomodations,
      });
    } else {
      accomodations = await Accomodation.find();
      if (!accomodations) {
        return res.status(400).json({
          message: "Accomodations do not exist!",
        });
      } else {
        return res.status(200).json({
          message: accomodations,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAccomodation = async (req, res) => {
  try {
    const accomodation = await Accomodation.findById(req.params.id);
    if (!accomodation) {
      return res.status(400).json({
        message: "This accomodation does not exist!",
      });
    } else {
      return res.status(200).json({
        message: accomodation,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateAccomodation = async (req, res) => {
  try {
    const accomodation = await Accomodation.findById(req.params.id);
    if (!accomodation) {
      return res.status(400).json({
        message: "This accomodation does not exist!",
      });
    } else {
      await Accomodation.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });

      return res.status(200).json({
        message: accomodation,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteAccomodation = async (req, res) => {
  try {
    const accomodation = await Accomodation.findById(req.params.id);
    if (!accomodation) {
      return res.status(400).json({
        message: "This accomodation does not exist!",
      });
    } else {
      await Accomodation.findByIdAndDelete(req.params.id);

      return res.status(200).json({
        message: "Accomodation has been deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
