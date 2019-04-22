// Set the application ID
var applicationId = "sandbox-sq0idp-010CDEl0AXI2c7vjQx52Gg";

// Set the location ID
var locationId = "CBASECT3qGhWnfTjmrl4tt4uTIYgAQ";

const PMT_RESPONSE_KEY = "MTA_P001";

function buildForm(form) {
    alert('SqPaymentForm ' + SqPaymentForm);
    if (SqPaymentForm.isSupportedBrowser()) {
        alert('buildForm');
        form.build();
        form.recalculateSize();
    }
}

function force() {
    alert('in force');
    alert(paymentForm);
    buildForm(paymentForm);
}
/*
 * function: requestCardNonce
 *
 * requestCardNonce is triggered when the "Pay with credit card" button is
 * clicked
 *
 * Modifying this function is not required, but can be customized if you
 * wish to take additional action when the form button is clicked.
 */
function requestCardNonce(event) {

    // Don't submit the form until SqPaymentForm returns with a nonce
    event.preventDefault();

    // Request a nonce from the SqPaymentForm object
    paymentForm.requestCardNonce();
}

// Create and initialize a payment form object
var paymentForm = new SqPaymentForm({

    // Initialize the payment form elements
    applicationId: applicationId,
    locationId: locationId,
    inputClass: 'sq-input',
    autoBuild: true,

    // Customize the CSS for SqPaymentForm iframe elements
    inputStyles: [{
        fontSize: '16px',
        fontFamily: 'Helvetica Neue',
        padding: '16px',
        color: '#373F4A',
        backgroundColor: 'transparent',
        lineHeight: '24px',
        placeholderColor: '#CCC',
        _webkitFontSmoothing: 'antialiased',
        _mozOsxFontSmoothing: 'grayscale'
    }],

    // Initialize Apple Pay placeholder ID
    applePay: false,

    // Initialize Masterpass placeholder ID
    masterpass: false,

    // Initialize the credit card placeholders
    cardNumber: {
        elementId: 'sq-card-number',
        placeholder: '• • • •  • • • •  • • • •  • • • •'
    },
    cvv: {
        elementId: 'sq-cvv',
        placeholder: 'CVV'
    },
    expirationDate: {
        elementId: 'sq-expiration-date',
        placeholder: 'MM/YY'
    },
    postalCode: {
        elementId: 'sq-postal-code',
        placeholder: '12345'
    },

    // SqPaymentForm callback functions
    callbacks: {
        /*
         * callback function: createPaymentRequest
         * Triggered when: a digital wallet payment button is clicked.
         * Replace the JSON object declaration with a function that creates
         * a JSON object with Digital Wallet payment details
         */
        createPaymentRequest: function () {

            return {
                requestShippingAddress: false,
                requestBillingInfo: true,
                currencyCode: "USD",
                countryCode: "US",
                total: {
                    label: "MERCHANT NAME",
                    amount: "100",
                    pending: false
                },
                lineItems: [
                    {
                        label: "Subtotal",
                        amount: "100",
                        pending: false
                    }
                ]
            }
        },

        /*
         * callback function: cardNonceResponseReceived
         * Triggered when: SqPaymentForm completes a card nonce request
         */
        cardNonceResponseReceived: function (errors, nonce, cardData) {
            if (errors) {
                // Log errors from nonce generation to the Javascript console
                console.log("Encountered errors:");
                errors.forEach(function (error) {
                    console.log('  ' + error.message);
                    alert(error.message);
                });

                return;
            }
            // Assign the nonce value to the hidden form field
            document.getElementById('card-nonce').value = nonce;

            // POST the nonce form to the payment processing page
            console.log('nonce ' + nonce);
            alert('nonce ' + nonce);
            //   document.getElementById('nonce-form').submit();

            // match stripe
            chargeRequest = {
                accountId: "1",
                client: "Alice Adams",
                service: "Massage 60",
                statementDescription: "Mary's Massage Massage 60",
                transId: 'supplied by api',
                method: "square",
                methodData: {
                    applicationId: 'sandbox-sq0idp-010CDEl0AXI2c7vjQx52Gg',
                    accessToken: 'sandbox-sq0atb-WgDHzd4g3nZPVR8RfOTMQg',
                    locationId: 'CBASECT3qGhWnfTjmrl4tt4uTIYgAQ',
                    fee: 0.0275
                },
                amount: 90,
                card: {
                    number: "",
                    expMonth: "",
                    expYear: "",
                    cvc: 0
                },
                cardNonce: nonce
            }

            // POST the nonce to my payment processing endpoint
            var xhr = new XMLHttpRequest();
            xhr.open("POST", 'http://localhost:48000/mtacc/square', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function () { 
                // console.log('readystatechange');
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    console.log(xhr.response);
                    // get this data back to ionic
                    // TODO encrypt============================
                    // write to local storage
                    window.localStorage.setItem(PMT_RESPONSE_KEY, xhr.response);
                    alert('closing');
                    window.close();
                }
                if (this.readyState === XMLHttpRequest.DONE && this.status === 400) {
                    console.log(xhr.response);
                    // get this data back to ionic
                    window.localStorage.setItem(PMT_RESPONSE_KEY, xhr.response);
                    window.close();
                }
            }
            xhr.send(JSON.stringify(chargeRequest))
        },

        /*
         * callback function: unsupportedBrowserDetected
         * Triggered when: the page loads and an unsupported browser is detected
         */
        unsupportedBrowserDetected: function () {
            /* PROVIDE FEEDBACK TO SITE VISITORS */
        },

        /*
         * callback function: inputEventReceived
         * Triggered when: visitors interact with SqPaymentForm iframe elements.
         */
        inputEventReceived: function (inputEvent) {
            switch (inputEvent.eventType) {
                case 'focusClassAdded':
                    /* HANDLE AS DESIRED */
                    break;
                case 'focusClassRemoved':
                    /* HANDLE AS DESIRED */
                    break;
                case 'errorClassAdded':
                    document.getElementById("error").innerHTML = "Please fix card information errors before continuing.";
                    break;
                case 'errorClassRemoved':
                    /* HANDLE AS DESIRED */
                    document.getElementById("error").style.display = "none";
                    break;
                case 'cardBrandChanged':
                    /* HANDLE AS DESIRED */
                    break;
                case 'postalCodeChanged':
                    /* HANDLE AS DESIRED */
                    break;
            }
        },

        /*
         * callback function: paymentFormLoaded
         * Triggered when: SqPaymentForm is fully loaded
         */
        paymentFormLoaded: function () {
            /* HANDLE AS DESIRED */
            console.log("paymentFormLoaded");
            alert("paymentFormLoaded");
        }
    }
});
