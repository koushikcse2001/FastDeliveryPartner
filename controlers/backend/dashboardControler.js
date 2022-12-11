module.exports = {

    index: (req, res, next) => {
       res.render('backend/deshboard/index.hbs', { title: 'deshboard', layout:'backend/layout' });
    },
    profile: (req, res, next) => {
        res.render('backend/deshboard/profile.hbs', { title: 'deshboard profile', layout:'backend/layout' });
    }
     
}