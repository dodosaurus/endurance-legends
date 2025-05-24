This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## What the hell is this?
endurancelegends is concept application, where Strava user could buy boosters with collectible cards and expand his collection by logging more Strava activities. 

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
- [x] some kind of grid in card preview info
- [x] landing page simple hero and Register vs. Login card
- [x] signature somewhere with "Powered by Strava"
- [x] polish dark mode (need to play with vars in global.css)
- [x] landing page cards
- [x] how it works card for landing page/for navabr later
- [x] add 20 last images to more cards
- [x] add for newest cards the indicator (maybe dot, that will disappear after hover)
- [x] AI generated image? OR/AND some card backs/cards stacked and panned (left column)
- [x] short catchy slogan/phrase (left column)
- [x] display image source, other gathered data from PCS (card preview right panel)
- [x] try to login as different user and fix problem that we have (on localhost with Mari's account)
- [x] check db:clear-owned-cards to not interfere with my test users, only take in consideration jozef_kov
- [x] remove fixed date and find out from what date we will count in activites when user joins EV (maybe from minus 7 days + new user bonus)
- [x] how to modal needs to be responsive and more interactive
- [x] add some version, build number identifier in some small/hidden component to track releasees
- [x] add progress bar on dashboard
- [x] add progress bar to /collection
- [x] taking in consideration other activity types (walk, hike) and think about the coins earnings
- [x] do not log tokens
- [x] global size of the card needs to be lowered to be more viable for mobile (iPhone SE in insepctor)
- [x] strava_athlete username need to be reserved/handled - it is some kind of reserved username for new users? (maybe do it if we find user with same name, we will generate some hash ad the end)
- [x] remove resiudal context
- [x] if activities fetch return 200 activites it is max - we should fetch activities only with timestamp of the newest, and check if there is newer (using "after"); if there are no activities, just fetch "after" = timeCap
- [x] navbar and back navigation refactor (making place for more improtant buttons like "Reveal all", more filters in /collection)
- [x] regenerate cards with updated winners, monuments GTs are buggy, seed again, clear owned cards for me
- [x] add back button in main section above dashboard/opening contents (layout.tsx?)
- [x] bigger font on all buttons (as text on cards on dashboard)

## TODO

- [ ] add map miniature to dsashboard - make dashboard more readable (titles) - <a> whole table row to Strava
- [ ] /collection needs to be refactored and ready for next filters (rarity filters mainly, new cards)
- [ ] add new user bonus notification when new user joins (toast notification) - inform that only last 7 days of activites were counted in
- [ ] rework the dashboard loading - mainly after card opening, the coin balance refresh and collection size refresh
  - we need to rework whole fetching mechanism - to fetch often but in small calls, instead of doing one big call and clogging whole site at the start
  - so for cards only user will be fetched, for activity table only activites - this way Suspense will probably work (problematic at first tries...)
- [ ] confetti when opening card pack (add more visual funniness)
- [ ] when user is deleted, and cookie is still stored in client, it do not get reseted (some warning you were logged out and button to logout)
- [ ] when user logs after long time and he has 200 new activities it could be problem, because 200 activities are capped on Strava API

META GAME (upgrading cards after all collection is collected - or some value goal reached)
- this should serve as continuation for athletes that already collected all (majority of the cards)
- would be nice to have trading and friends but is not reuqired
- coins could be spend also on upgrade the cards - card will become 3D? or we unlock variation of the card
- to create "golden" version of the card we could use AI somehow (some stabe diffusion model, to alter the graphic in defined way)
- each card then can have golden/platinum/diamond version, each will be more expensive, and athlete would need to sport his way to be able to upgrade such cards
- progress bar should be more customized, with some colorful milestones, which will sign when the user can enter the gold/platinum/diamond meta game

Collection:
- [ ] enhance new badge - or add new grids to collection (last opened, opened in last 24 hours)
- [ ] collected cards count of all rarities on /collection
- [ ] sorting by rarity/ rarity vs. non-rarity cards
- [ ] implement radio button switch to switch between grid and table view
- [ ] nicer progress bar on collected cards

Re-roll mechanism:
- before trading stuff, we could implement re-roll mechanism, where user can pick duplicated crads - like 4 and re-roll them and he will get one random card he do not own in return

How to page:
- [ ] should be expanded with more info and moved to another route

Progress and rewards:
- [ ] think about new concept - maybe have milestones while filling out collectionn and user should be awarded by something
  - it could be compeltely different think, like something outside of the game, some sponsor discount code
  - it could be some seconnd meta game which will award user by special (golden ex.) versions of random card; this could start meta collecting for adavnced users
  (we would need some kind of cycle system then for regular collection)

Profile page:
- [ ] profile page should be separate route not modal
- [ ] contain statistics of run/rode km, opened packs; only some should be elsewehere
- trasnactions - should contain history table of all transactions

Responsivity:
- [ ] mobile screen enhancments - collection and not owned card placeholders, navbar and its offset from right
- [ ] implement carousel with 2 cards per turn for medium screens

Landing page:
- add video
- [ ] Login card - think about it, do we need it? if user has token in cookies, he is logged inn; we maybe need just one button to get in
- rethink and google how to handle situation, when user already was already gave permissions through Strava, but after token expiration still needs to be redirecte to Strava and Authorize; how to identify such user coming to our app) - this should be case for LOGIN from lannding page

Opening:
- [ ] implement flip card (maybe not possible if front/back are not absolute)
- [ ] add booster phase before user see cards and transition (how will booster look and the consequent animation)

Card:
- [ ] images for other cards (a lot of work :) - before release we need to snap UCI rankings again and rework all cards
- think about COPYRIGHT!!! - could we give pictures to AI to recreate them? do they lose their copyright after?

End game:
- plan hoow should it looks like
- think about how we can transition to different rewards (some sponsors for some subcollection of cards)
- [ ] season mechanic (collection for season, hall of fame with all gathered cards, preseason?)
- [ ] handling situations where user already own whole collection

Testing:
- [ ] implement some kind of mock service that will mimic real user of Strava, service that can hold multiple test users (so we dont have to test only with real Strava users), each user has to have some mocked activites, way to generate mock activites
- after release we need test user rather than testing with real one (maybe partially with real one)
- we need compeletly different stage when product is released (new DB for dev)
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
