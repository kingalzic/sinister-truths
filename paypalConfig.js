// paypalConfig.js
const paypal = require('@paypal/checkout-server-sdk');

function environment() {
    const clientId = 'ATou7SlrFwSytRtphSPj4r4_BITTUUW1s1o5kXyWi7xnvmQ5KpOKvF-Xq0dYkZF7TslECaI93RKqv9oh'; // Replace with your client ID
    const clientSecret = 'EJnbgXCLiqhui2JGtnsmEWMX--3QKYYFxZ6Hz_qcdsERDbGIgChFRKbHdbSxV0Hj7na2SSP-cqOeuX7V'; // Replace with your client secret

    return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

function client() {
    return new paypal.core.PayPalHttpClient(environment());
}

module.exports = { client };
