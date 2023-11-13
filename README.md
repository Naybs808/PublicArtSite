# ArtSite
This is a source code repository for https://matthews.flat9art.com

To build this website locally, clone the repo to your local machine.

    git clone git@github.com:Naybs808/ArtSite.git

Ensure you have yarn installed to the path of the machine you are on (https://classic.yarnpkg.com/lang/en/).

Navigate to the PublicArtSite directory:

    cd PublicArtSite

Then run:

    yarn install
    yarn start

A local version of the website should be running on http://localhost:3000.

Stock levels are kept track of using a firestore cloud database.

Purchases are processed using StripeJS.

This public facing repo may be slightly out of date when compared with the live version of the website.
