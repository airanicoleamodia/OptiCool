// const sendToken = (user, statuscode, res, message = 'success') => {

//     const token = user.getJwtToken();

//     res.status(statuscode).json({
//         user,
//         success: true,
//         token,
//         message,
//     })
// }

// module.exports = sendToken;

const sendToken = (user, statuscode, res, message = 'success') => {
    const token = user.getJwtToken();

    // Sanitize user object
    const safeUser = { ...user.toObject() };
    delete safeUser.password; // Exclude sensitive data

    res.status(statuscode).json({
        user: safeUser,
        success: true,
        token,
        message,
    });
};

module.exports = sendToken;
