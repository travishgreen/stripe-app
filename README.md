# Buying Used Retro Fleece - Stripe PM Take Home

A basic Node & React web application that uses Stripe Payments Intents to facilitate checkout of a one-time purchase of a retro fleece, including logging the details of each payment event to a file for later fulfillment. 

## How to run the app (MacOS, Linux should be similar but was not tested)
### 0. Setup 

Ensure you have git, nvm, stripe, concurrently, yarn, homebrew, and winston installed:
	
#### Git (for MacOS >10.9) 

```git --version``` (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
	

#### Node Version Manager (includes npx & npm)
```curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash```

```nvm install node``` (https://github.com/nvm-sh/nvm#installation) -> so that we can run Node

#### Concurrently 
```npm install -g concurrently``` (https://www.npmjs.com/package/concurrently) -> so that the stripe example code runs

#### Yarn 
```curl -o- -L https://yarnpkg.com/install.sh | bash``` (https://classic.yarnpkg.com/en/docs/install/) -> so that the stripe example code runs

#### Stripe 
```npm install --save stripe``` (Stripe docs - https://stripe.com/docs/payments/integration-builder) -> so that we can talk to Stripe

#### Homebrew
```/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"``` (https://brew.sh/) -> for installing Stripe CLI later (if needed)

#### Winston 
```npm install winston --save``` (https://github.com/winstonjs/winston) -> for easier logging

### 1. Download branch
Can be cloned from here: ```git clone https://github.com/travishgreen/stripe-app.git```

Move to the containing folder, likey via: ```cd stripe-app/```

### 2. Finalize your local environment setup
#### a. Get Stripe JS 
```npm install --save @stripe/react-stripe-js @stripe/stripe-js```
#### b. Toggle into test mode (bottom of the left nav pane in the bottom left of the Dashboard screen)
#### c. Replace public keys in src/app.js and secret key into server.js from the Dashboard (https://dashboard.stripe.com/test/apikeys)
#### NOTES: 
i. Added metadata to the payments so that the older/current documentation's test cases validate on this snazzy webpage (https://stripe.com/docs/payments/accept-a-payment#web-test-integration)

ii. Keys included in the sample have been cycled

### 3. Run the application
In a new window, navigate to the stripe-app folder, and run these commands:

```npm install```

```npm start```

### 4. Setup and start logging
```brew install stripe/stripe-cli/stripe``` ()

```stripe login``` (follow the onscreen instructions)

In a new tab: ```stripe listen --forward-to http://localhost:4242/webhook```

### 5. Run through the test cases
#### Go to [localhost:3000/checkout] to enter each test card's details

#### Options validating for the test cases:
##### i. Web (https://stripe.com/docs/payments/accept-a-payment#web-fulfillment)
Enter card details from that page with any date/CVC/zipcode (or equivalents in your local market), and complete a "purchase" with each.
Run "Check Payments" from that same page.

##### ii. Dashboard (https://dashboard.stripe.com/)
Enter card details from https://stripe.com/docs/payments/accept-a-payment#web-fulfillment with any date/CVC/zipcode (or equivalents in your local market), and complete a "purchase" with each.
Open the dashboard
Confirm that you're viewing test data (bottom left of the screen)
Go to the "Payments" tab (top of the left nav) and run through the payments there

### 6. Verify Logging
After running the test cases, logs can be found in ```combined.log``` in the project's root directory.
