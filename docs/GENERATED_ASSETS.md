# Rafla editorial image-generation manifest

Generation mode: built-in Codex `imagegen` tool. The broker-desk scene was generated from a text prompt. Every subsequent scene used that output as a style reference; the office scene also used the supplied Venice Boulevard building photo as an architectural reference. Production exports are WebP at 640, 828, 1100, and 1536 pixels wide. The social crop is a 1200×630 JPEG.

## Shared final style prompt

Apply this direction to every scene: a bespoke tactile editorial illustration, hand painted in gouache and screen-printed on lightly fibrous cream paper; confident deep-navy ink outlines; slightly imperfect registration; restrained halftone and paper grain; expressive, natural but simplified faces; sophisticated 1960s California civic-brochure warmth updated for a premium contemporary independent insurance brokerage. Use deep ink navy `#0B2146`, warm cream `#F5F1E8`, insurance gold `#D5A11F`, and sparing muted terracotta `#B65F48` and dusty blue `#7E9EB2`. Landscape 3:2, dense and richly observed but calm, with a clear silhouette at phone size and key subjects inside a responsive-safe central area. No readable text, letters, numbers, logos, watermark, signature, shields, floating icons, UI, generic technology motifs, photorealism, glossy vector art, gradients, neon, or purple.

## Final scene prompts and outputs

### Broker desk

Output: `public/images/illustrated/broker-desk-v6.webp`

Inside a warm, lived-in local insurance office, a friendly male broker sits at a wooden desk with a couple. They actively review a real-looking policy folder together; the broker points to one page while the couple leans in, relaxed and engaged. Include a car key, a small house sketch, a certificate page, a pen, two coffee cups, and a broad window hinting at Venice Boulevard with a low stucco storefront, palm, and parked car. The scene must unmistakably read as personal insurance guidance, not a bank, SaaS company, hospital, or law firm. Put the people and desk in the lower-right two-thirds and preserve a quieter window-and-wall area in the upper-left.

### Household

Output: `public/images/illustrated/household-v6.webp`

A multigenerational Los Angeles household in the driveway of a modest warm-stucco bungalow: two adults, one child, and a grandparent casually gathering before leaving. Show a family car, a bicycle with helmet, a small dog near the porch, and house keys exchanging hands. The emotional note is protected everyday life—warm, capable, inviting, never posed stock-photo smiles. The car, home, and people must be equally legible at phone size. Add low Mar Vista homes, a leafy street tree, and one distant palm. Layer the porch and bungalow in the background, people in the middle ground, and car and bicycle on a strong foreground diagonal.

### Small business

Output: `public/images/illustrated/small-business-v6.webp`

An inviting Westside Los Angeles neighborhood business in active early-morning preparation. A woman who owns a small café/storefront stands at the open doorway reviewing a clipboard with a friendly insurance broker; nearby, two employees safely unload boxes and supplies from a compact commercial van. Include a storefront awning, hand truck, stacked cartons, wet-floor cone near the doorway, keys, clipboard papers, and work van. The people should look capable and engaged, not posed. Make the image unmistakably about protecting a real small business, its vehicle, employees, premises, and daily operations.

### Auto review

Output: `public/images/illustrated/auto-review-v6.webp`

A couple stands beside their parked modern family sedan on a sunny Westside residential curb while a local insurance broker uses a paper coverage checklist on the car hood. One adult holds the key fob; the other checks a small child seat through an open rear door. Include a registration envelope, pen, folded proof-of-insurance card, curb, low stucco homes, street tree, and distant palm. The broker should feel helpful, not salesy. The scene must read as a practical auto coverage review, not a car advertisement or roadside emergency.

### Renters inventory

Output: `public/images/illustrated/renters-inventory-v6.webp`

Two diverse young adult renters in a characterful Los Angeles apartment make a simple home inventory together. One photographs a laptop and camera on a table with a phone; the other checks a paper room-by-room list beside a bookcase. Include a bicycle leaning safely near the wall, guitar in a stand, couch, abstract framed art, plants, headphones, small kitchen background, and a cat investigating an open storage box. The scene should feel lived in, warm, and practical and clearly communicate renters insurance protecting belongings and liability, not moving services or real estate.

### Workers’ compensation

Output: `public/images/illustrated/workers-safety-v6.webp`

Outside a tidy neighborhood workshop, a diverse four-person trades crew prepares for the day: one experienced lead demonstrates a safe lift beside a hand truck, another checks a safety list on a clipboard, a third adjusts a hard hat, and the owner speaks with the local insurance broker near an open work van. Include grounded tools, cones, gloves, a ladder properly secured on the van, a visible first-aid kit, and boxed materials. Everyone is attentive, human, and active. This should feel like prevention, employee care, and a real insured operation—not an industrial mega-site or construction stock photography.

### Venice Boulevard office

Output: `public/images/illustrated/office-venice-illustrated-v6.webp`

Use the supplied real office photo as the factual architectural and location reference: preserve its recognizable low cream-stucco commercial building, dark metal window and door frames, entry walkway, building proportions, and Westside streetscape, but recompose it as a welcoming landscape illustration. Show the neighborhood office on a warm Los Angeles morning, with a couple walking toward the entrance carrying a policy folder, a local broker greeting them near the doorway, one parked car, a bicycle at a rack, planters, a palm, and Venice Boulevard context. The building must be the main subject and feel specific to a real place, not an imaginary house or corporate headquarters. Simplify any source signage into abstract navy-and-gold shapes without fake words.

### Specialty and recreational

Output: `public/images/illustrated/specialty-v6.webp`

A Westside Los Angeles weekend-preparation scene. In a tidy driveway near a low home, three friends or family members prepare a touring motorcycle and compact travel trailer for a trip; a small fishing boat on a proper trailer is visible farther back. One person fastens a helmet strap, another checks trailer lights with a paper checklist, and the third secures gear. Include a helmet and jacket, hitch, wheel chock, tie-down straps, life jacket, compact tool roll, keys, and checklist. Everyone behaves safely. The feeling is “enjoy the weekend because the details are handled,” not adrenaline sports or luxury advertising.

### Policy desk

Output: `public/images/illustrated/policy-desk-v6.webp`

A top-down independent broker’s coverage-review desk arranged with purposeful human imperfection. Center an open navy-and-gold policy folder with blank diagrammatic pages, unprinted sticky tabs, reading glasses, fountain pen, car and house keys, small measuring tape, simple home floor-plan sketch, vehicle registration envelope, business certificate page with embossed gold seal, calculator, ceramic coffee cup, and a small sprig from a street tree. A broker’s hand and a client’s hand enter from opposite edges and point to different parts of the same page, making the scene about clarification and comparison rather than a generic office flat lay.

### Contact service

Output: `public/images/illustrated/contact-service-v6.webp`

A genuine neighborhood insurance service moment at the Rafla front desk. A friendly customer-service professional sits at a warm wooden desk, speaking on a corded office phone while marking a paper service checklist. A walk-in client stands at the counter holding a policy envelope and car keys; they make natural eye contact. Include organized paper file trays, wall calendar blocks without text, a pen cup, small desktop bell, coffee mug, abstract coastal print, office plant, and a glimpse through the window toward a low Venice Boulevard storefront. The mood is responsive, welcoming, and competent—help with policy changes, certificates, billing questions, and claims steps—not a call center or technology support desk.

### Social share crop

Output: `public/images/brand/rafla-social-v6.jpg`

This is a centered 1200×630 production crop of the broker-desk master, created without generative edits so social previews use the same commissioned scene as the website.

## Second craft-pass scenes

Generation mode: built-in Codex `imagegen` tool. All three scenes were generated with `broker-desk-v6.webp` as a style-only reference and with new compositions. Production files are WebP at 640, 828, 1100, and 1536 pixels wide; the original generated PNGs remain in the Codex generated-image store.

### Home and property review

Output: `public/images/illustrated/home-property-v7.webp`

Create a new homeowners and property-insurance review outside a modest, well-kept Westside Los Angeles stucco bungalow on a leafy Mar Vista street. A local broker and two homeowners walk the property together: one homeowner holds keys and a renovation folder, the broker points toward roof and exterior details on a paper property checklist, and the other homeowner measures a window. Keep the bungalow, people, and checklist legible at phone size. Use the shared gouache-and-screen-print visual language and palette. Avoid disaster imagery, luxury-mansion imagery, readable text, logos, UI, gradients, photorealism, and stock-photo posing.

### Claims follow-through

Output: `public/images/illustrated/claims-service-v7.webp`

Create a calm neighborhood service scene beside a modest Los Angeles repair shop after a minor fender-bender. A local broker helps a driver organize next steps at the open trunk of an everyday sedan; the driver holds a phone with a reference photo while the broker checks a paper claim-notes folder, and a repair representative indicates a small bumper dent. The scene should communicate reassurance and local help after the policy begins. Use the shared gouache-and-screen-print visual language and palette. Avoid injuries, emergency response, dramatic damage, readable text, logos, UI, gradients, and photorealism.

### Certificates, bonds, and filings

Output: `public/images/illustrated/certificates-bonds-v7.webp`

Create a business-document service scene at a neighborhood insurance counter. A woman who owns a small contracting business and a crew lead review an organized packet with a local broker. The broker separates a blank certificate page, bond form, registration envelope, and contractor agreement into color-tabbed folders; a hard hat and key ring ground the scene in a real insured operation. Use the shared gouache-and-screen-print visual language and palette. Avoid staged handshakes, courtroom or banking imagery, readable text, logos, UI, gradients, and photorealism.
