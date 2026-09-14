import styled from "styled-components";
import Image from "next/image";
import { DeniseAssets } from "./deniseCdn";
import { DeniseImageSlot } from "./DeniseImageSlot";
import { DeniseCta } from "./DeniseCta";
import { DeniseProsCons } from "./DeniseProsCons";
import { DeniseInlineLink } from "./DeniseInlineLink";

const PRESS = ["VOGUE", "GLAMOUR", "REFINERY29", "BUSTLE", "WOMEN'S HEALTH", "ELLE"] as const;

const StyledArticle = styled.article`
  width: 100%;
  max-width: 48rem;
  margin: 0 auto;
  padding: 32px 20px 48px;
  color: #292929;
  font-family: Georgia, "Times New Roman", serif;

  @media (min-width: 640px) {
    padding: 48px 24px;
  }
`;

const StyledRuleThick = styled.hr`
  margin: 0;
  border: 0;
  border-top: 2px solid #292929;
`;

const StyledRule = styled.hr`
  margin: 28px 0 0;
  border: 0;
  border-top: 1px solid #e5e5e5;
`;

const StyledTitle = styled.h1`
  margin: 24px 0 0;
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 700;
  font-size: 28px;
  line-height: 38px;
  letter-spacing: 0;
  color: #292929;

  @media (min-width: 640px) {
    font-size: 32px;
    line-height: 42px;
  }
`;

const StyledTitleAccent = styled.span`
  color: #882a2b;
`;

const StyledByline = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 28px;
`;

const StyledAvatar = styled(Image)`
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
`;

const StyledBylineBody = styled.div`
  min-width: 0;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  line-height: 1.35;
`;

const StyledAuthor = styled.p`
  margin: 0;
  font-weight: 700;
  color: #292929;
`;

const StyledMeta = styled.p`
  margin: 4px 0 0;
  color: #8a8a8a;
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 32px;
`;

const StyledP = styled.p`
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 31px;
  letter-spacing: 0;
  color: #292929;
`;

const StyledStrong = styled.p`
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 31px;
  color: #292929;
`;

const StyledSection = styled.section`
  margin-top: 48px;
`;

const StyledPickSection = styled.section`
  margin-top: 48px;
  padding-top: 40px;
  border-top: 1px solid #e5e5e5;
`;

const StyledH2 = styled.h2`
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 700;
  font-size: 26px;
  line-height: 34px;
  letter-spacing: 0;
  color: #292929;

  @media (min-width: 640px) {
    font-size: 32px;
    line-height: 42px;
  }
`;

const StyledOfferNote = styled.p`
  margin: 8px 0 0;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #2f7d4a;
`;

const StyledSubNote = styled.p`
  margin: 8px 0 0;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  color: #8a8a8a;
`;

const StyledQuote = styled.blockquote`
  margin: 0;
  padding-left: 16px;
  border-left: 4px solid rgba(136, 42, 43, 0.4);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 18px;
  font-style: italic;
  font-weight: 400;
  line-height: 31px;
  color: #292929;
`;

const StyledPress = styled.section`
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid #e5e5e5;
`;

const StyledPressLabel = styled.p`
  margin: 0;
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-align: center;
  text-transform: uppercase;
  color: #8a8a8a;
`;

const StyledPressRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px 32px;
  margin-top: 20px;
`;

const StyledPressItem = styled.span`
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: rgba(138, 138, 138, 0.7);
`;

const StyledDisclaimer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid #e5e5e5;
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  line-height: 1.6;
  color: #8a8a8a;
`;

export const DeniseArticle = () => (
  <StyledArticle>
    <StyledRuleThick />

    <StyledTitle>
      After 12 Years Fitting Plus Size Women,{" "}
      <StyledTitleAccent>Here&apos;s the Bra I Wish Every One of Them Had Started With</StyledTitleAccent>
    </StyledTitle>

    <StyledByline>
      <StyledAvatar
        src={DeniseAssets.authorAvatar}
        alt="Denise Carter, Plus Size Fit Specialist"
        width={52}
        height={52}
        priority
        data-slot="1"
      />
      <StyledBylineBody>
        <StyledAuthor>By Denise Carter · Plus Size Fit Specialist</StyledAuthor>
        <StyledMeta>Fitting Expert. 12 years on the shop floor. Updated Sep 14, 2026</StyledMeta>
      </StyledBylineBody>
    </StyledByline>

    <StyledRule />

    <DeniseImageSlot n={2} priority />

    <StyledBody>
      <StyledP>
        I have fitted more plus size women than I can count. Sizes 38 to 48, D cup through I cup, women who came in
        already apologizing before they took their coat off.
      </StyledP>
      <StyledP>And almost every one of them said a version of the same sentence: &quot;I&apos;m hard to fit.&quot;</StyledP>
      <StyledP>
        They are not. I want to be very clear about that, because it is the single most damaging thing our industry has
        taught plus size women. You are not hard to fit. You have been fitted into bras that were never designed for your
        body, only stretched to cover it.
      </StyledP>
      <StyledP>There is a difference, and it is the whole story.</StyledP>
    </StyledBody>

    <StyledSection>
      <StyledH2>The Scaling Problem</StyledH2>
      <StyledBody>
        <StyledP>
          Here is what happens in most bra factories when a brand decides to &quot;extend the size range.&quot; They take a bra
          designed and tested on a 34B. Then they scale it up. Same cup construction, same strap width, same band
          engineering, just bigger numbers on the label. A 44H bra built from a 34B pattern is not a bra for a 44H body. It
          is a small bra wearing a large tag.
        </StyledP>
        <StyledP>You feel the result of that decision every single day:</StyledP>
        <StyledP>
          The band rides up your back, because it was never engineered to carry the weight it is now being asked to carry.
          The straps cut grooves into your shoulders, because when the band gives up, the weight has nowhere to go but up.
          The cups gap at the top and spill at the side, because the cup shape was drafted for a bust that sits differently
          than yours does. And the wire, scaled up along with everything else, presses harder the bigger it gets.
        </StyledP>
        <StyledP>
          Then you get told to try a sister size. Or to go up a band. Or to accept that this is just what a big bust feels
          like.
        </StyledP>
        <StyledStrong>
          None of that is a fit problem you caused. It is a design problem you inherited.
        </StyledStrong>
      </StyledBody>
    </StyledSection>

    <StyledSection>
      <StyledH2>What Actually Holds You Up</StyledH2>
      <StyledBody>
        <StyledP>The band. Not the wire, not the straps, the band.</StyledP>
        <StyledP>
          A bra&apos;s band is what carries the weight around your ribcage, where your skeleton can take it. On a plus size
          body that band has to be wide, firm and genuinely engineered, not a thin strip of elastic borrowed from a smaller
          pattern. When the band does its job, your shoulders stop doing it for free.
        </StyledP>
        <StyledP>
          After the band: full contour cups that cradle and shape from underneath rather than compressing from the front,
          and wide straps that spread the load instead of concentrating it into two red lines.
        </StyledP>
        <StyledP>
          Get those three right and the wire becomes unnecessary. On a full, heavy bust the wire was never lifting anything
          anyway. It sits against your ribs and gives your tissue something to dig around, gap over and slide against. Take
          it out, build the band properly, and everything sits where it should.
        </StyledP>
        <StyledP>
          So I did what I always do when I want to know if something is real. I tested. Here is how the three options plus
          size women actually reach for compare.
        </StyledP>
      </StyledBody>
    </StyledSection>

    <StyledPickSection>
      <StyledH2>#1 Pick — The Shapermint Contour Bra</StyledH2>
      <StyledOfferNote>Buy One, Get One Free, for a limited time</StyledOfferNote>
      <DeniseImageSlot n={3} />
      <StyledBody>
        <StyledP>
          I put this on expecting the usual: comfortable enough, no real shape. Within about ten seconds I knew this one was
          built differently.
        </StyledP>
        <StyledP>
          The band is the tell. It is wide, firm and smoothing, with extra coverage across the sides and back, and it holds
          its position instead of climbing. That single detail changes everything downstream, because once the band carries
          the weight, the straps stop cutting and the shoulders stop aching. The full contour foam cups lift and round from
          underneath rather than pressing a heavy bust into one flat line, and the wide adjustable straps spread what little
          load reaches them.
        </StyledP>
        <StyledP>
          What I noticed first was the absence of things. No dig. No poke. No wire shifting position every time I moved.
          Nothing to readjust. By mid afternoon there was still nothing to think about, which for a plus size bra is
          genuinely rare.
        </StyledP>
        <StyledP>
          What I noticed second was the shape. My bust sat higher and rounder than it had in any wired bra, with a clean
          line under a fitted top instead of a spill at the side. My back looked smoother. No red marks at the end of the
          day, and no relief rip the second I got home.
        </StyledP>
        <StyledP>
          And the range is real, not decorative. The fit runs up to an H/I cup and a 48 band, with alpha sizing from S to
          4XL. That matters more than it sounds: alpha sizing means the bra was drafted to fit a body across a range, not
          scaled up from a pattern that stopped at 36C.
        </StyledP>
        <StyledP>
          This is not a hunch. It is the <DeniseInlineLink>#1 best selling bra in America</DeniseInlineLink>. Sold at
          Walmart. Featured on national TV and in InStyle, Elle and Cosmopolitan. Backed by more than 78,000 five star
          reviews from over a million women. One of them said it better than I can:
        </StyledP>
        <StyledQuote>
          &quot;The best bras out there for us larger breasted women, and look ma, no wires!&quot;
        </StyledQuote>
        <StyledP>
          It is <DeniseInlineLink>the bra I reach for</DeniseInlineLink>, and the one I now recommend first to every plus
          size client who asks me where to start.
        </StyledP>
      </StyledBody>

      <DeniseProsCons
        pros={[
          "Wide, firm band that carries the weight instead of riding up",
          "Full contour cups lift and round a heavy bust rather than flattening it",
          "Wide straps spread the load, no shoulder grooves",
          "Smooths back and sides for a clean line under clothes",
          "Real extended range: up to H/I cup, bands to 48, alpha sizing S to 4XL",
          "60 day fit guarantee and free exchanges, so you can try your size risk free",
        ]}
        cons={[
          "Sizing runs generous, so check the chart. Your old wired size may not translate",
          "The alpha sizing takes a minute to get used to if you have shopped band and cup your whole life",
        ]}
      />
      <DeniseCta label="Get The Buy One, Get One Free Deal" />
    </StyledPickSection>

    <StyledPickSection>
      <StyledH2>#2 — The Extended Size Underwire</StyledH2>
      <StyledSubNote>
        The one you get sent to at the department store, and the one built from someone else&apos;s pattern
      </StyledSubNote>
      <DeniseImageSlot n={4} />
      <StyledBody>
        <StyledP>
          This is where most plus size women are sent, and I understand why. It looks like a serious bra. It has structure,
          hooks, a wire. It feels like it should be the answer.
        </StyledP>
        <StyledP>
          The problem is what is underneath the label. Most extended size underwire bras are scaled up from a pattern built
          for a much smaller bust, which means the band is proportionally too light for the weight it now carries. So the
          band rides, the weight transfers to your shoulders, and the wire (bigger, and pressing harder the bigger it gets)
          digs in under your arm while doing nothing to lift.
        </StyledP>
        <StyledP>
          Gaping cups, side spillage, shoulder grooves and the daily ritual of readjusting are not signs that you were
          measured wrong. They are what a scaled up bra does to a plus size body.
        </StyledP>
      </StyledBody>

      <DeniseProsCons
        pros={[
          "Familiar construction, it is what most of us were measured for",
          "Widely available in stores where you can try before buying",
          "Feels structured the moment you put it on",
        ]}
        cons={[
          "Usually a smaller bra scaled up, not a bra designed for a plus size body",
          "The band rides up, so your shoulders end up carrying the weight",
          "The wire frames the bust, it does not lift it, and it digs harder at larger sizes",
          "Gaping at the top and spillage at the side are built into the pattern",
          "The 6pm relief rip",
        ]}
      />
      <DeniseCta label="Try The Contour Bra" />
    </StyledPickSection>

    <StyledPickSection>
      <StyledH2>#3 — The Stretch-To-Fit Bralette</StyledH2>
      <StyledSubNote>Sold as &quot;fits sizes S to 3XL&quot;, which should be your first warning</StyledSubNote>
      <DeniseImageSlot n={5} />
      <StyledBody>
        <StyledP>
          This is where a lot of plus size women land after they finally give up on wires, and I understand the appeal
          completely. It is soft, it pulls on, nothing digs, you can breathe.
        </StyledP>
        <StyledP>
          But look closely at how these are sold: one garment covering an enormous size range. That only works if the
          garment has almost no structure at all, because structure is what has to change between sizes. So you get a thin
          band, thin straps, and cups with no contour. On a lighter bust that is fine. On a plus size bust it means the
          fabric stretches to your shape and then holds nothing, so you get compression instead of lift, the band creeps up
          your back by lunchtime, and the straps start cutting because they are the only thing left doing the work.
        </StyledP>
        <StyledP>Comfortable for an evening on the sofa. Not a bra you can work a full day in.</StyledP>
      </StyledBody>

      <DeniseProsCons
        pros={["No wire, immediate relief", "Soft and easy to pull on", "Fine for lounging, sleeping, or a lighter bust"]}
        cons={[
          "Almost no band structure, which means no real lift for a heavy bust",
          "Compresses a full bust instead of shaping it",
          "Thin straps cut in once the band stops holding",
          "Band rides up the back by midday",
          "A range that wide is a sign the garment was not engineered for any one size in it",
        ]}
      />
      <DeniseCta label="Try The Contour Bra" />
    </StyledPickSection>

    <StyledPickSection>
      <StyledH2>My Honest Take</StyledH2>
      <DeniseImageSlot n={6} />
      <StyledBody>
        <StyledP>
          The extended size underwire is a smaller bra wearing a bigger label, and it puts the weight in exactly the wrong
          place. The stretch-to-fit bralette gets the &quot;no wire&quot; part right and forgets that a heavier bust still needs a
          band that holds.
        </StyledP>
        <StyledP>
          <DeniseInlineLink>The Shapermint Contour Bra was the clear winner.</DeniseInlineLink> It is the only wire free
          bra I tested where the band genuinely carries the weight at a plus size, and the only one that lifts and rounds a
          full bust instead of pressing it flat. It is backed by more than 78,000 five star reviews from over a million
          women, and with the <DeniseInlineLink>60 day fit guarantee</DeniseInlineLink> you can try your actual size at
          home rather than guessing in a fitting room.
        </StyledP>
        <StyledP>
          So if you have spent years being told you are hard to fit, hear this from someone who has fitted thousands of
          women: you were never the hard part. The bras were built for someone else and handed to you in a bigger size. Get
          the band right, get the cup right, and your body stops being the problem it never was.
        </StyledP>
        <StyledP>
          Right now you can try it <DeniseInlineLink>Buy One, Get One Free, for a limited time</DeniseInlineLink>. Get one
          in black, one in your everyday colour, and see the difference for yourself.
        </StyledP>
      </StyledBody>

      <DeniseCta label="Try The Contour Bra. Buy One, Get One Free" />
    </StyledPickSection>

    <StyledPress>
      <StyledPressLabel>As Seen On</StyledPressLabel>
      <StyledPressRow>
        {PRESS.map((p) => (
          <StyledPressItem key={p}>{p}</StyledPressItem>
        ))}
      </StyledPressRow>
    </StyledPress>

    <StyledDisclaimer>
      <p>
        The Bra Edit publishes independent fit reviews and shopping guides for women. Articles may contain links to
        products we recommend.
      </p>
      <p>
        Individual fit and results vary by body type and size. Comfort, lift and shaping described reflect how the garment
        fits and feels while worn. This page is not medical advice. Always consult the brand&apos;s size guide for the best
        fit.
      </p>
      <p>© 2026 The Bra Edit. All rights reserved.</p>
    </StyledDisclaimer>
  </StyledArticle>
);
