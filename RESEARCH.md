# Endurance Legends Research Summary

## Business Idea

Endurance Legends is a gamified fitness product built on top of Strava. The core concept is to turn real endurance activity into in-app progression and collectible rewards.

Users connect their Strava account, sync their activities, earn in-app coins from movement, and spend those coins on booster packs that unlock collectible cycling cards. The cards are themed around professional cycling riders and races, with rarity tiers that make collecting feel closer to a trading-card game than a standard fitness dashboard.

## What The Product Is Trying To Achieve

The product is trying to make endurance exercise more engaging, more habit-forming, and more emotionally rewarding.

Its main goals are:

- increase user motivation to stay active by attaching rewards to real training
- turn routine activity logging into a progression loop
- combine Strava tracking with collecting, rarity, and pack-opening excitement
- create longer-term engagement through collection completion and future meta-game systems
- eventually support social and retention mechanics such as trading, friends, and advanced progression

In simple terms, the product fantasy is: your fitness earns you a collectible cycling collection.

## Target Audience

The project is primarily aimed at:

- existing Strava users
- recreational runners, cyclists, walkers, and hikers
- endurance-sport hobbyists who enjoy tracking performance and consistency
- cycling fans, especially users interested in World Tour riders and races
- users who respond well to gamification, progression systems, rewards, and collecting

The strongest fit appears to be people who already train with Strava and would enjoy an extra motivational layer on top of their normal activity habits.

## Current Implementation Summary

The current codebase is a working prototype with a real end-to-end product loop already implemented.

### Implemented Core Flow

- landing page with Strava login/signup entry point
- Strava OAuth callback and local session cookie creation
- user creation and Strava token storage in the database
- synchronization of athlete profile data and recent activities from Strava
- persistence of activities, users, sessions, transactions, and cards through Prisma
- coin rewards based on activity type and distance
- pack purchase and pack opening flow
- assignment of newly opened cards to the user, including duplicate ownership handling
- dashboard showing user progress and activity history
- collection page showing owned cards and the full card catalog
- opening page that displays the latest acquired cards
- dark mode support and responsive UI work for smaller screens

### Current Product Shape

The app currently behaves like a collectible layer on top of Strava activity:

1. User signs in with Strava.
2. The app fetches recent activities and stores them locally.
3. Those activities are converted into coin rewards.
4. Coins can be spent on packs.
5. Packs unlock four cycling-themed cards.
6. The user can review progress on the dashboard and in the collection view.

### Technical State

- framework: Next.js 14 App Router
- frontend: React 18, Tailwind CSS, shadcn/ui
- backend pattern: server components and server actions with minimal API surface
- database: PostgreSQL via Prisma
- auth/session: JWT cookie using `jose`
- extra capability: PWA configuration via `next-pwa`

## Current Limitations And Gaps

The project is functional, but it is still clearly in an active prototype stage rather than a hardened production product.

Notable gaps from the current repo state:

- linting currently fails in several UI files
- TypeScript checking currently fails in at least one Prisma script
- build configuration ignores TypeScript and ESLint errors during builds
- there are no test files in the repository yet
- route protection is not fully consistent across all authenticated pages
- sync logic still has known limitations around large Strava activity histories and fetch granularity
- several roadmap items in `README.md` are still open, especially collection filters, profile expansion, trading, meta progression, analytics, and error monitoring

## Overall Assessment

Endurance Legends already demonstrates a clear product direction: use Strava activity as the input for a reward loop built around collectible cycling cards.

The current implementation is strong enough to validate the concept with real users, especially Strava-based endurance athletes and cycling fans. The next stage is less about proving the idea exists and more about improving reliability, UX polish, retention mechanics, and production readiness.
