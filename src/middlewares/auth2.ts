export default function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
}
