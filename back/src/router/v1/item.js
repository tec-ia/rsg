const express = require("express")
const router = express.Router()

const ItemService = require("../../service/item")

router.get("/", ItemService.all)
router.get("/id/:id", ItemService.byId)
router.get("/username/:username", ItemService.byUsername)
router.post("/", ItemService.create)
router.put("/", ItemService.update)
router.delete("/", ItemService.delete)

router.post("/login", ItemService.login)

module.exports = router