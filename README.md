This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## What the hell is this?
endurancevault is concept application, where Strava user could buy boosters with collectible cards and expand his collection by logging more Strava activities. 

## DONE

- [x] dashboard UI mockup (blocks from shadcn)
- [x] login page mockup
- [x] next DB planned models
- [x] authentication implementation (Strava OAuth)
- [x] session cookie is not saved on deployed version (maybe httpOnly flag on cookie?)
- [x] implement getting list of activities and displaying it on dashboard
- [x] logout button initial concept
- [x] saving activities in DB
- [x] fix bug that kms are calcualted before activities fetch - need some cascade implementation where activites are always fetched first
- [x] test when new activites are added to DB (changing timeCap from older to newer)
- [x] implement card displaying run/cycled kilometers from time of registration
- [x] add DB field to user lastActivityRefresh and display it in info panel (it could be debug panel)
- [x] implement card displaying account balance (give automatically some points on sign up) 
- [x] light yellow bg on acitvity rows that are newest and were added in last 24 hours = are the newest ("new")
  - we need to store list of ids of newest activities on user, then in frontend we can check if activity is new on each table row
  - also we need timestamp on activity when it was added to our system (to check 24 hours)
- [x] light green bg on activities that were added in last 7 days (secondary green, "added in last 7 days") - maybe not needed that much
- [x] logout button on dashboard with cookies().delete("session")
- [x] need caluclator in backend with concept formula - on syncDashboard() we need recalculate accountBalance based on new activities
- [x] mine (at least some, for testing) data for cards
- [x] prepare model of card
- [x] putting nice redirect page between callback and dashboard (loading.tsx?)
- [x] give cards rarity attributes, other special attributes (grand tour, monument...) migrate DB and insert JSON into DB
- [x] common/uncommon (WT riders), rare cards (WT stage races other than grand tours), epic cards (WT one day races), legendary (grand tours, only 3)
- [x] implement navbar with logo <-> name and avatar (we have pictures from sign up)
- [x] synchronize button for fetching newest activities (+ anti spam protection = disabling button while fetching), add icon instead
- [x] /collection page; based on owned cardIds on user, list first in some table owned cards/maybe also not owned with some grayed out rows for ex.
- [x] rework opening to not route segment but to drawer without path, opening should one be action on form
- [x] implement rarity randomizer (so we add some modifier to algorithm and rare cards will appear more often uncommon > rare > epic > legendary)
- [x] dispalying and somehow holding last cards acquired in drawer, wiht dashboard still being most recent
- [x] prepare button for Buy & Open booster, disable when not enough coins
- [x] after opened pack we need to update frontend coins status immidiately
- [x] when opening pack with same card that we already own - adjust the opening engine to correctly adjust number of copies (do we need to know when each copy was acuqired? we can throw out numberOfCopies in that case)
- [x] adjust rarity modifiers
- [x] dump DB to local (mainly master collection)
- [x] implement quick way for cleaning ownedCards, transactions a collectedCards on user for testing
- [x] put displaying coins number and drawer to one component, so we can better control what is displayed in coins status/button - it is critical
- [x] isSynchronizing in context to show pending and disabled status also on open pack when synchronizing (solved in other way)
- [x] different accent color than purple (purple are epic cards)
- [x] show number of copies in collection page (check ownedCards for duplicate cardIds)
- [x] put info card as button modal trigger, display in My Collection and avatr in navbar, coins card should be in middle in first panel
- [x] show only owned cards in separate table in collection (should be as tab - main tab; whole collection should be next tab; from shad cn component)
- [x] find out best way to dynamically put bg to card (external source and next image, or local images and CSS bg)
- [x] country code map from DB countries and add it to card front component
- [x] button connect to Strava
- alternative - maybe best would be to have script that reads our raw json and based on id finds picture in local folder and uploads it with card to supabase, and save image url rigthaway to db; with this we could also find way how to put other mined data to DB (winned races ex.)
- [x] find some pictures for some rarity cards, think about model
- [x] card preview in collection (only owned cards!!!) (app-card-front in modal)
- [x] adding carousel for mobile view for opening cards, fix preview width, throw out some columns for mobile in collection
- [x] CSS - card back design (three shape with our accent color from video)
- [x] responsive card title for different char lenghts (text-lg for 17 chars, text-sm for 20 chars, text-xs for 25 chars)
- [x] CSS for glass button is interfering with card preview!!!! fix
- [x] placeholder for image and again seed and use whole DB, placeholder also as fallback when loading image
- [x] link on activities
- [x] button Open should be displayed and disabled when not enough coins
- [x] add My collection button to separate card to dashboard, maybe also glassy button but, make open pack different color
- [x] navbar should display synchronize and logout button
- [x] Grid view - implement default view that will show cards themselves in a grid & paginated
- [x] card images that need refactor -> 38, 39, 40, 42, 45, 48, 49, 131
- [x] Card preview - should show information that we have in DB
- [x] number of copies as badge in collection grid on each card (some absolute element)

## TODO

- [ ] landing page simple hero and Register vs. Login card
- [ ] some kind of grid in card preview info
- [ ] add for newest cards the indicator (maybe dot, that will disappear after hover)
- [ ] signature somewhere with "Powered by Strava"
- [ ] polish dark mode (need to play with vars in global.css)
- [ ] rework dashboard table to show transactions - when activity make row collapsible and there show additional info a put View on Strava button

Collection:
- [ ] Table view - each (owned/all) should have 2 separate tables, one for cyclists/one for races
- [ ] implement radio button switch to switch between grid and table view
- [ ] Grid view - will have sorting by rarity and owned/all should stay as from table view

Strava DEV guideline:
- [ ] to footer add honorable mentions (new route) for other major sources used to make app (ex. card back design, shadcn, Strava API ...)

Dashboard rework:
- activities will display now also every Transaction (new symbol to sign newest, new column to signal - or +)
- [ ] change data for table, change columns

Responsivity:
- [ ] implement carousel with 2 cards per turn for medium screens
- [ ] mobile screen enhancments - collection and not owned card placeholders, navbar and its offset from right

Landing page:
- [ ] Login vs. Register cards - logic behind it (right column)
- rethink and google how to handle situation, when user already was already gave permissions through Strava, but after token expiration still needs to be redirecte to Strava and Authorize; how to identify such user coming to our app) - this should be case for LOGIN from lannding page
- [ ] AI generated image? OR/AND some card backs/cards stacked and panned (left column)
- [ ] short catchy slogan/phrase (left column)

Opening:
- [ ] probability for 85 cards vs 135 cards in collection (chatgpt), some interface for changing it (or find 50 more cards :))
- [ ] implement flip card (maybe not possible if front/back are not absolute)
- [ ] add booster phase before user see cards and transition (how will booster look and the consequent animation)

Card:
- [ ] display image source, other gathered data from PCS (card preview right panel)
- [ ] images for other cards (a lot of work :) - maybe not that prio, because when we release prod version, we probably do new snapshot of UCI rankings

End game:
- plan hoow should it looks like
- think about how we can transition to different rewards (some sponsors for some subcollection of cards)
- [ ] season mechanic (collection for season, hall of fame with all gathered cards, preseason?)
- [ ] handling situations where user already own whole collection

Testing:
- [ ] need activity generator for testing and test adding new activities and changing of distances and coins

Trading:
- [ ] reading friends from Strava and finding out which one is on EV already
- [ ] clicking on card give option in modal to Request Trade
- [ ] implement pending trades component on navbar

Misc:
- [ ] make /admin only accessible to username jozef_kov
- [ ] error rate limit page redirect when 429 is returned from Strava
- [ ] deauthorize (maybe not, this should be separate option in profile to cancel the authorization) on logout here: POST https://www.strava.com/oauth/deauthorize
- [ ] custom 404 page (loading, error pages -> also possible from server component?); loading hopefully works after login in Strava while page is redirecting
- [ ] additional to loading.tsx add lazy loading on tables (on other components)
- [ ] setting up analytics (Posthog?)
- [ ] error management (Sentry?)
 

## Sources mentions
https://www.procyclingstats.com/
https://www.flaticon.com/free-icon/triathlon_15179919?term=run+bike&page=1&position=2&origin=search&related_id=15179919
