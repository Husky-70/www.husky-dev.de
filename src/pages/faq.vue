<template>
    <div style="padding-top: 1.5rem">
        <b-row class="faq-row">
            <b-col>
                <div class="faq-question">
                    {{$t('pages.faq.questionJoinJob')}}
                </div>
                <div class="faq-answer">
                    {{$t('pages.faq.answerJoinJob')}}
                </div>
            </b-col>
        </b-row>
        <hr />
<!--        <b-row class="faq-row">
            <b-col>
                <div class="faq-question">
                    {{$t('pages.faq.questionFeatureJob')}}
                </div>
                <div class="faq-answer">
                    {{$t('pages.faq.answerFeatureJob')}}
                    <a href="https://twitter.com/husky_70" target="blank" style="text-decoration: underline">Twitter</a>
                </div>
            </b-col>
        </b-row>
        <hr />-->
        <b-row class="faq-row">
            <b-col>
                <div class="faq-question">
                    {{$t('pages.faq.questionNoPC')}}
                </div>
                <div class="faq-answer">
                    {{$t('pages.faq.answerNoPC')}}
                </div>
            </b-col>
        </b-row>
        <hr />
        <b-row class="faq-row">
            <b-col>
                <div class="faq-question">
                    {{$t('pages.faq.questionDunce')}}
                </div>
                <div class="faq-answer">
                    {{$t('pages.faq.answerDunce')}}
                </div>
            </b-col>
        </b-row>
        <hr />
        <b-row class="faq-row">
            <b-col>
                <div class="faq-question">
                    {{$t('pages.faq.questionJugger')}}
                </div>
                <div class="faq-answer">
                    {{$t('pages.faq.answerJugger')}}
                </div>
            </b-col>
        </b-row>
        <hr />
        <b-row class="faq-row">
            <b-col>
                <div class="faq-question">
                    How to bring Duffelbags to freemode from your jobs?
                </div>
                <div class="faq-answer">
                    After you spawn in the job with the Duffelbag, open up your interaction menu, go to Style -
                    Accessoires - Gear and press D-PAD LEFT one time! It should equip heist gear, you will have to buy
                    it if you don't have it.
                    After that, open your phone and quit the job.
                    You should spawn with the bag in freemode. If not, register as CEO and switch the CEO clothing once
                    to the left and back. If you still not have it, restart the job.
                    Without changing clothing, drive to the mask shop, get a oppressor or helicopter, fly in the sky and
                    jump off it.
                    Pull parachute and land in the front of the mask shop, before your character starts pulling off the
                    parachute, press D-pad to enter mask shop, save the outfit. Once you back out, you will have a
                    parachute on, just equip the saved outfit and it should be the Duffelbag.
                </div>
            </b-col>
        </b-row>
<!--        <hr />
        <b-row>
            <b-col>
                <div class="faq-question">
                    {{$t('pages.faq.question10k')}}
                </div>
                <div class="faq-answer">
                    {{$t('pages.faq.answer10k')}}
                </div>
            </b-col>
        </b-row>-->
    </div>
</template>

<script>
    export default {
        name: "faq"
    };
</script>

<style lang="scss">
    .faq- {
        &question {
            font-weight: bold;
            font-size: 1.2rem;
        }

        &answer {
            font-size: .8rem;
        }

        &row {
        }
    }
</style>
