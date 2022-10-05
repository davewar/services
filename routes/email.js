const router = require('express').Router();
const emailCtrl = require('../controllers/emailCtrl');

router.route('/').get(emailCtrl.getEmail_get); //get all emails
router.route('/').post(emailCtrl.addEmail_post); //create email
router.route('/:id').delete(emailCtrl.deleteEmail_delete); //delete email
router.route('/:id').put(emailCtrl.amendEmail_put); //amend employee

module.exports = router;