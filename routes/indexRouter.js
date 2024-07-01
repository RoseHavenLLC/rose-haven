const express = require("express");
const indexRouter = express.Router();



indexRouter.get("/", (req, res) => {
    res.render("home", {
        pageTitle: "Welcome"
    })
});

indexRouter.get("/our-story", (req, res) => {
    res.render("our-story", {
        pageTitle: "Our Story"
    })
});

indexRouter.get("/blog", (req, res) => {
    res.render("blog", {
        pageTitle: "Blog"
    })
});

indexRouter.get("/gallery", (req, res) => {
    res.render("gallery", {
        pageTitle: "Gallery"
    })
});

indexRouter.get("/contact", (req, res) => {
    res.render("contact", {
        pageTitle: "Contact"
    })
});



module.exports = indexRouter;