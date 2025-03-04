const requestIp = require("request-ip");

const getIpMiddleware = (req, res, next) => {
    req.userIp = requestIp.getClientIp(req); // Attach IP to request
    console.log("User IP:", req.userIp);
    next(); // Move to next middleware or route
};

module.exports = getIpMiddleware;
