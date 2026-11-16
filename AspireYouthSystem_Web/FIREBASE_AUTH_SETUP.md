# Aspire Youth – shared Firebase Authentication setup

Both projects have been updated to use the same Firebase Authentication account system and the same Realtime Database profile contract.

## Shared Firebase project

- Firebase project ID: `aspireyouth`
- Realtime Database root: `/ayi`
- Authentication provider: Email/Password
- Canonical user profile: `/ayi/users/{firebaseUid}`
- Role collection: `/ayi/students/{firebaseUid}` or `/ayi/tutors/{firebaseUid}`

Passwords are handled by Firebase Authentication. New code does not write passwords or password hashes to Realtime Database.

## 1. Enable Email/Password authentication

1. Open Firebase Console and select the `aspireyouth` project.
2. Open **Authentication → Sign-in method**.
3. Enable **Email/Password** and save.
4. Confirm that the Android `google-services.json` still belongs to project `aspireyouth` (the supplied file does).
5. Host the website on HTTPS or localhost. Firebase web Authentication will not work reliably from a `file://` URL.

## 2. Shared profile structure

Example profile:

```json
{
  "uid": "FIREBASE_AUTH_UID",
  "id": 1790000000000,
  "first": "Jane",
  "last": "Example",
  "fullName": "Jane Example",
  "email": "jane@example.co.za",
  "role": "Student",
  "bio": "",
  "status": "Pending",
  "location": "",
  "createdAt": 1790000000000
}
```

The profile is written to `/ayi/users/{uid}` and copied to the role collection for compatibility with the existing website dashboards and Android data sync. Both clients authenticate with Firebase Authentication and then load the profile using the authenticated UID.

## 3. Fresh-account setup

The selected approach is a fresh authentication start; existing password hashes in the old Realtime Database records cannot be converted into Firebase Authentication passwords by the clients.

Before removing old data, export/backup the Realtime Database and note any accounts that must be retained. Then, in Firebase Console:

1. Open **Authentication → Users** and delete the old test accounts that should not carry over.
2. In Realtime Database, remove only old account/profile records under `/ayi/users`, `/ayi/students`, and `/ayi/tutors` if you want a completely clean user directory.
3. Do not delete `/ayi/sessions`, `/ayi/attendance`, `/ayi/grades`, or other programme data unless you intentionally want to erase those records too.
4. Register new student/tutor accounts from either client. They will appear in the same Firebase Authentication Users list and the same `/ayi/users/{uid}` profile path.

New student and tutor registrations are set to `Pending`. An administrator must approve them before they can log in. The website's existing legacy administrator login is unchanged and remains website-only; it is not a Firebase Authentication account. The Android app login is for student/tutor accounts.

## 4. Build the Android app

Open the `MyTutor` folder in Android Studio, allow Gradle sync, then build/run the app. The app now includes the Firebase Authentication dependency. If Gradle cannot download dependencies, retry on a network that can reach the Gradle and Google Maven repositories.

## 5. Test both directions

1. Register a new student in the website; approve the account in the website admin dashboard; log in with the same email/password in Android.
2. Register a new tutor in Android; approve the account in the website admin dashboard; log in with the same email/password on the website.
3. Confirm both accounts appear in Firebase Console → Authentication → Users.
4. Confirm each profile exists at `/ayi/users/{uid}` and its matching role path.
5. Confirm a pending account is denied access until its profile status becomes `Approved`.

## Important security note

The supplied `database.demo-only.rules.json` explicitly allows public read/write access and must not be deployed for a real service. Realtime Database rules must be secured before production. A simple `auth != null` rule is only a starting point: this app's administrator approval and cross-role dashboard operations need role-aware authorization, ideally enforced with trusted server code/custom claims. Never rely on hidden buttons or client-side role checks as the security boundary.

## Validation limitation

The website module passes a JavaScript syntax check. An Android Gradle compile could not be completed in this environment because the Gradle wrapper distribution could not be downloaded (network/DNS unavailable); please run the Android build in Android Studio after syncing dependencies.
