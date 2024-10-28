const logger = (req, res, next) => {
    const { method, url } = req;
    const timestamp = new Date().toISOString();
    
    // log the details to the console
    console.log(`[${timestamp}] ${method} request to ${url}`);
    
    // call the next middleware or route handler
    next();
};

module.exports = logger;
