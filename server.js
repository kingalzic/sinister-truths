const express = require('express');
const paypal = require('@paypal/checkout-server-sdk');
const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));
app.use(express.json()); // To parse JSON requests

// PayPal configuration
function environment() {
    const clientId = 'ATou7SlrFwSytRtphSPj4r4_BITTUUW1s1o5kXyWi7xnvmQ5KpOKvF-Xq0dYkZF7TslECaI93RKqv9oh'; 
    const clientSecret = 'EJnbgXCLiqhui2JGtnsmEWMX--3QKYYFxZ6Hz_qcdsERDbGIgChFRKbHdbSxV0Hj7na2SSP-cqOeuX7V'; 
    return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

function client() {
    return new paypal.core.PayPalHttpClient(environment());
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Create order endpoint
app.post('/create-order', async (req, res) => {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: '0.70', // Replace with the amount you want to charge
            },
        }],
    });

    try {
        const order = await client().execute(request);
        res.status(200).json({ id: order.result.id });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating order');
    }
});

// Capture order endpoint
app.post('/capture-order/:orderId', async (req, res) => {
    const request = new paypal.orders.OrdersCaptureRequest(req.params.orderId);
    request.requestBody({});

    try {
        const capture = await client().execute(request);
        res.status(200).json({ capture });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error capturing order');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});