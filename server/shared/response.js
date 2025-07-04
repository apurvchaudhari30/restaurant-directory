
module.exports.sendResponse = (resp, code, responseData, message) => {
    const output = {
        code: code,
        message: message,
        data: responseData
    }
    resp.status(200).send(output);
};