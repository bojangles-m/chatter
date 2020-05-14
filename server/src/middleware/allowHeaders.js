// Let the server know that we should expect and allow a header with
// the content-type of 'Authorization -> [x-access-token]'
const allowHeaders = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,x-access-token');
    next();
};

module.exports = allowHeaders;
