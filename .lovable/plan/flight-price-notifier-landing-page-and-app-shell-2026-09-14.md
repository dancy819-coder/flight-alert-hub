# Flight Price Notifier landing page and app shell

## Overview
Build a polished bilingual public landing page, complete email/password authentication, and a protected `/app` dashboard placeholder. Authentication will use Lovable Cloud accounts only; no profile, subscription, or other custom data tables will be created.

## Pages and flows
- `/`: Dark, responsive landing page with the exact English and Traditional Chinese copy, a prominent product name, sign-in action, three feature cards, and the requested footer.
- `/auth`: Combined sign-in and sign-up experience with clear mode switching, validation, loading, and error states.
- `/reset-password`: Complete recovery form so password-reset links can set a new password safely.
- `/app`: Protected signed-in page showing `Hi {user.email}`, the bilingual dashboard placeholder, and sign out.
- Signed-out visitors who open `/app` will be sent to `/auth`; successful sign-in/sign-up will continue to `/app`.

## Visual direction
- Near-black foundation with restrained violet accents, crisp borders, and luminous route/price visual details.
- Clean sans-serif typography, strong hierarchy, compact cards, and mobile-first layouts.
- Subtle entrance and scroll-reveal motion with reduced-motion support.

## Authentication and security
- Enable Lovable Cloud and email/password authentication.
- Disable email confirmation for the requested easy testing flow.
- Use only standard account records; create no custom tables, profiles, RPCs, or application-data queries.
- Keep protected-page access session-driven and clear cached private state before sign-out.
- Include password recovery alongside sign-in and sign-up for a complete email/password flow.

## Verification
- Check landing, authentication, protected redirect, signed-in greeting, sign-out, and mobile/desktop presentation.
- Confirm route-specific page titles and social metadata, keyboard focus states, and no preview errors.
