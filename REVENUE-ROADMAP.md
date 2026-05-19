# WebElle Revenue Roadmap — €500/Month Goal

## Target Breakdown (as of May 2026)
- **Monthly Goal:** €500
- **Primary Product:** Business Starter Kits (€47 standard / €97 with website)
- **Blended Average:** ~€50/kit (mix of both tiers)
- **Required Sales:** 10 sales/month = 2.5 sales/week = 0.35 sales/day

## The Funnel (What We Control)
```
Traffic Sources → Landing Page → Conversion → Sales
     ↓                ↓              ↓          ↓
  Pinterest        webelle.store    Quiz      €47-€97
  Instagram        (quiz + CTA)    Fix       per kit
  Facebook        
  SEO Blog        
  Etsy Shop       
```

## Phase 1: UNBLOCK CONVERSIONS (Week 1-2) — Critical
**Without fixing these, MORE traffic = MORE wasted visitors**

### Tasks for Gigi:
1. **Fix Quiz Bug** (Always shows same result)
   - Wire up actual question→kit mapping logic
   - Test all 5 kit recommendations work
   - Goal: Trusted recommendation → higher conversion

2. **Fix Newsletter Form** (Dead, no submission)
   - Build `/api/subscribe` route using SendFox API
   - Or connect SendFox form endpoint directly
   - Goal: Capture 30+ leads/month for nurture sequence

3. **Add Social Proof to Website**
   - Footer: Add Etsy, Pinterest, Facebook, LinkedIn, TikTok links
   - Homepage: Add 5-star review snippet
   - Blog posts: CTA to kits with review

**Success Metric:** Landing page converts at 1%+ (up from ~0% now)

---

## Phase 2: DRIVE TARGETED TRAFFIC (Week 2-4) — Ongoing

### Traffic Targets (Daily):
- **Pinterest:** 15 visitors (primary channel - visual, search-driven)
- **Organic SEO:** 10 visitors (blog posts ranking)
- **Instagram:** 5 visitors (story highlights, bio link)
- **Facebook:** 5 visitors (page posts, groups)
- **Etsy Shop:** 5 visitors (internal Etsy search)
- **TOTAL:** 40 visitors/day → 0.4 sales/day at 1% conversion

### Tasks for Gigi (Daily Rotation):
1. **Pinterest SEO (Priority #1)**
   - Create 3 vertical pins/week per blog post
   - Keyword-rich pin descriptions (150 chars)
   - Link directly to webelle.store/kits (not Etsy - better margin)

2. **SEO Blog Posts (3/month)**
   - Target HIGH-CONVERTING keywords:
     - "How to start [business] with no money 2026"
     - "[Business] starter kit review"
     - "Best tools for [business] beginners"
   - 500-800 words, 5+ H2 sections, CTA to kits
   - Update `lib/blog.ts` (not markdown files!)

3. **Etsy Optimization (Weekly)**
   - Top 5 listings: 140-char titles, 13 tags each
   - Descriptions with keyword-rich H2 headers
   - CTA: "Get full kit at webelle.store/kits"
   - Add 5-star review to shop announcement

4. **Instagram + Facebook (3x/week each)**
   - Repurpose blog posts into carousels (5-7 slides)
   - Mix: Product spotlight, tips, social proof
   - CTA: "Link in bio for full starter kit"

**Success Metric:** 40+ visitors/day by Week 4

---

## Phase 3: OPTIMIZE & SCALE (Month 2+) — When Traffic Flows

### A/B Test Ideas:
- Quiz vs. No Quiz (does it help or hurt?)
- €47 vs €97 pricing page test
- "Start Free" vs "Get Kit Now" CTA buttons
- Pinterest pin designs (text overlay vs lifestyle image)

### Upsell Opportunities:
- "Bundle: Any 3 kits for €97" (upsell from €47)
- "Done-for-you website setup" (€197 add-on)
- Affiliate program (10% commission for referrals)

---

## Weekly KPIs Gigi Must Track (Every Wednesday)

| Metric | Current | Week 1 | Week 2 | Week 3 | Week 4 | Goal |
|--------|---------|--------|--------|--------|--------|------|
| webelle.store visitors/day | ? | 10 | 20 | 30 | 40 | 40 |
| Etsy shop visitors/day | ? | 5 | 5 | 5 | 5 | 5 |
| Landing page conversion | ~0% | 0.5% | 1% | 1.5% | 2% | 2% |
| Sales this week | ? | 1 | 2 | 2 | 3 | 2.5 |
| Email subscribers | 0 | 5 | 15 | 30 | 50 | 30+ |
| Pinterest pins live | 0 | 5 | 15 | 30 | 45 | 45 |
| Blog posts live | 1 | 2 | 3 | 4 | 5 | 3/month |

---

## Gigi's Updated Weekly Schedule

### Monday (08:00) — Funnel Audit
- Check webelle.store for broken links, missing CTAs
- Test quiz functionality
- Check newsletter form
- Review top 3 traffic pages for conversion optimization

### Tuesday (10:00) — Blog Post #1
- Research high-converting keyword
- Write 500-800 word post
- Create Pinterest pin (vertical, keyword-rich)
- Update `lib/blog.ts` + `npm run build` + commit

### Wednesday (09:00) — Market Research + KPI Review
- Search: New digital products for women (past 7 days)
- Pinterest: Top-performing pins in niche
- Update KPI tracker in `revenue-tracking.md`
- Send Telegram: "📊 Weekly KPIs: [metrics]"

### Thursday (10:00) — Blog Post #2
- Repeat Tuesday workflow

### Friday (10:00) — Blog Post #3 + Social Content
- Blog Post #3 (if needed for 3/month target)
- Create Instagram carousel (5-7 slides) from week's blog
- Create Facebook page post (product spotlight)
- Schedule next week's social content

### Daily (Quick Wins, 10 min)
- Etsy listing optimization (1 listing/day rotation)
- Pinterest pin creation (1/day)
- Check webelle.store analytics

---

## The "Project Manager" Rule for Gigi

**Every task must answer: "How does this drive sales?"**

❌ BAD: "Write a blog post about productivity tips"  
✅ GOOD: "Write a blog post: 'How to Start a Virtual Assistant Business in 2026' → links to VA Starter Kit"

❌ BAD: "Post on Instagram"  
✅ GOOD: "Instagram carousel: 5 tools every new Virtual Assistant needs → CTA to VA Starter Kit"

❌ BAD: "Optimize Etsy tags"  
✅ GOOD: "Optimize Etsy listing #3 (VA Kit) with keywords that convert to sales: 'virtual assistant starter kit 2026'"

---

## Blockers to Escalate to Marloes

Gigi should ONLY message you for:
1. **Credentials:** Facebook Page admin access, Etsy shop login, SendFox API key
2. **Approvals:** Pricing changes, new product ideas, quiz answer mapping
3. **Content:** Product photos, testimonials/reviews to feature
4. **Technical:** If webelle.store goes down, Vercel build fails 3x

**One request at a time. Be specific.**

---

## Month 1 Success Criteria (End of June 2026)

- [ ] 40+ daily visitors to webelle.store
- [ ] 2%+ landing page conversion rate
- [ ] 3 blog posts live (SEO optimized)
- [ ] 45+ Pinterest pins live
- [ ] Quiz working (5 different results)
- [ ] Newsletter capturing 30+ emails
- [ ] Facebook Page: 3 posts/week (12 total)
- [ ] Instagram: 3 posts/week (12 total)
- [ ] Etsy: Top 5 listings optimized
- [ ] **Revenue: €125+ (25% of €500 goal)**

**If Month 1 hits €125+ → Scale in Month 2 to hit €500**

---

## Project Manager Notes

- **Speed > Perfection:** Ship fast, iterate based on data
- **Pinterest > Instagram:** Pinterest drives 3x more traffic for this niche
- **webelle.store > Etsy:** Better margins (no 20% Etsy fee)
- **Quiz is KEY:** Personalized recommendation = higher trust = higher conversion
- **Email list = Compound growth:** Nurture sequences convert cold traffic to buyers

**Next Action for Marloes:** Approve this roadmap → I'll update Gigi's cron prompts to align with Phase 1 (fix blockers first!)
