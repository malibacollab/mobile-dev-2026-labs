# Lab 14 Linking

Build two separate Expo applications that communicate with each other. 

Use [Expo Linking](https://docs.expo.dev/versions/latest/sdk/linking/)

Create two distinct Expo projects in separate folders:
- `TestLinking`
- `TestLinking2`

For the mobile operating system to know which app to open, each app needs a unique URI Scheme.
- In `app.json` for TestLinking, add: `"scheme": "testlinking"`
- In `app.json` for TestLinking2, add: `"scheme": "testlinking2"`
- Configure als SPlash screens for each app

## App 1: TestLinking (The "Sender")
- Display a screen with a title "App 1: Home".
- Add a button labeled "To Settings TestLinking2".
- When pressed, this button should attempt to open the URL: `testlinking2://settings`.
- Check if the link can be opened before attempting the action. Show an alert if the target app is not installed.

### App 2: TestLinking2 (The "Receiver")
- This app must "listen" for an incoming URL.
- If the app is opened normally, show: "Welcome to TestLinking2 Home".
- If the app is opened via the `/settings` path, show: "Welcome to the SETTINGS Page" (use different background color to make the differene obvious).
- Add a button in this app that links back to `testlinking://profile`.


## Deliverables
- Add Splashscreen to both apps
- After testing on your side upload the 2 apps to Firebase App Distribution and Invite me

