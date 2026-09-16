import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

import { Header } from '../components/layout/Header'
import { Reveal } from '../components/ui/Reveal'
import { HeroSection } from '../components/sections/HeroSection'
import { BenefitsSection } from '../components/sections/BenefitsSection'
import { AboutSection } from '../components/sections/AboutSection'
import { SpeakersSection } from '../components/sections/SpeakersSection'
import { ScheduleSection } from '../components/sections/ScheduleSection'
import { CTASection } from '../components/sections/CTASection'

export function App() {
    return (
        <>
            <a className='skip-link' href='#main-content'>
                Pular para o conteúdo
            </a>

            <Header />

            <main id='main-content'>
                <Reveal>
                    <HeroSection />
                </Reveal>

                <Reveal>
                    <BenefitsSection />
                </Reveal>

                <Reveal>
                    <AboutSection />
                </Reveal>

                <Reveal>
                    <SpeakersSection />
                </Reveal>

                <Reveal>
                    <ScheduleSection />
                </Reveal>

                <Reveal>
                    <CTASection />
                </Reveal>
            </main>

            <Analytics />
            <SpeedInsights />
        </>
    )
}