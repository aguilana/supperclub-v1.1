const router = require("express").Router();
const {
  models: { User, Booking },
} = require("../db");
const { requireToken, isAdmin, requireTokenAndAuthorize } = require("../middleware/authMiddleware.js");
const moment = require('moment');
module.exports = router;

// USERS GET /api/users
router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: {
        role: "MEMBER",
      },
      attributes: { exclude: ["password", "isAdmin"] },
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// CHEFS GET /api/users/chefs
router.get("/chefs", async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: {
        role: "CHEF",
      },
      attributes: ["firstName", "lastName", "bio"],
      include: {
        model: Booking,
        as: "chefBooking",
        order: [['startDateTime', 'ASC']]
      },
    });

    // Sort bookings for each user using Moment.js
    users.forEach(user => {
      user.chefBooking.sort((a, b) => {
        const startDateTimeA = moment(a.startDateTime, 'MM/DD/YYYY h:mmA');
        const startDateTimeB = moment(b.startDateTime, 'MM/DD/YYYY h:mmA');
        if (startDateTimeA.isBefore(startDateTimeB)) {
          return -1;
        } else if (startDateTimeA.isAfter(startDateTimeB)) {
          return 1;
        } else {
          return 0;
        }
      });
    });

    res.json(users);
  } catch (err) {
    next(err);
  }
});

// MEMBERS GET /api/users/members
router.get("/members", requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: {
        role: "MEMBER",
      },
      attributes: { exclude: ["password", "isAdmin"] },
      include: {
        model: Booking,
        as: "memberBooking",
      },
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// --------------------------------------------------------------//
// MEMBERS GET /api/users/members/:id
router.get("/members/:id", requireToken, requireTokenAndAuthorize, async (req, res, next) => {
  try {

    const member = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password", "isAdmin"] },
      include: [
        {
          model: Booking,
          as: "memberBooking",
        },
      ],
    });
    res.json(member);
  } catch (err) {
    next(err);
  }
});

// MEMBERS GET/api/users/members/:id/bookings
router.get("/members/:id/bookings", async (req, res, next) => {
  try {
    const member = await User.findByPk(req.params.id, {
      include: [
        {
          model: Booking,
          as: "memberBooking",
        },
      ],
    });
    const { memberBooking } = member;
    res.json(memberBooking);
  } catch {
    next(err);
  }
});


// CHEFS GET /api/users/chefs/:id
router.get("/chefs/:id", async (req, res, next) => {
  try {
    const chef = await User.findByPk(req.params.id, {
      where: {
        role: "CHEF",
      },
      include: [
        {
          model: Booking,
          as: "chefBooking",
        },
      ],
    });
    if (chef.role === "CHEF") {
      res.json(chef);
    } else {
      throw new Error("Not Authenticated");
    }
  } catch (err) {
    next(err);
  }
});

// CHEFS BOOKINGS GET /api/users/chefs/:id/bookings
router.get("/chefs/:id/bookings", async (req, res, next) => {
  try {
    const chef = await User.findByPk(req.params.id, {
      where: {
        role: "CHEF",
      },
      include: [
        {
          model: Booking,
          as: "chefBooking",
        },
      ],
    });
    if (chef.role === "CHEF") {
      const { chefBooking } = chef;
      res.json(chefBooking);
    } else {
      throw new Error("Not Authenticated");
    }
  } catch (err) {
    next(err);
  }
});

// CHEFS BOOKINGS POST /api/users/chefs/:id/bookings
router.post("/chefs/:id/bookings", async (req, res, next) => {
  try {
    // might need to add authentication here to make sure the user is the user and adding to their own booking rather than someone else's!!
    const chef = await User.findByPk(req.params.id, {
      where: {
        role: "CHEF",
      },
      include: [
        {
          model: Booking,
          as: "chefBooking",
        },
      ],
    });
    if (chef.role === "CHEF") {
      res.status(201).json(await Booking.create(req.body));
    } else {
      throw new Error("Not Authenticated");
    }
  } catch (err) {
    next(err);
  }
});

// CHEFS BOOKINGS PUT /api/users/chefs/:id/bookings/:bookingId
router.put("/chefs/:id/bookings/:bookingId", async (req, res, next) => {
  try {
    const chef = await User.findByPk(req.params.id, {
      where: {
        role: "CHEF",
      },
      include: [
        {
          model: Booking,
          as: "chefBooking",
        },
      ],
    });

    if (chef.role === "CHEF") {
      const booking = await Booking.findByPk(req.params.bookingId);
      res.json(await booking.update(req.body));
    } else {
      throw new Error("Not Authenticated");
    }
  } catch (err) {
    next(err);
  }
})

// CHEFS BOOKINGS DELETE /api/users/chefs/:id/bookings/:bookingId
router.delete("/chefs/:id/bookings/:bookingId", async (req, res, next) => {
  try {
    const chef = await User.findByPk(req.params.id, {
      where: {
        role: "CHEF",
      },
      include: [
        {
          model: Booking,
          as: "chefBooking",
        },
      ],
    });
    if (chef.role === "CHEF") {
      const booking = await Booking.findByPk(req.params.bookingId);
      res.json(await booking.destroy());
    } else {
      throw new Error("Not Authenticated");
    }
  } catch (err) {
    next(err);
  }
})
