import { Header } from '../components/layout/Header'

import { HeroSection } from '../components/sections/HeroSection'
import { BenefitsSection } from '../components/sections/BenefitsSection'
import { AboutSection } from '../components/sections/AboutSection'
import { SpeakersSection } from '../components/sections/SpeakersSection'
import { ScheduleSection } from '../components/sections/ScheduleSection'
import { CTASection } from '../components/sections/CTASection'

export function App() {
    return (
        <>
            <Header />

            <main>
                <HeroSection />
                <BenefitsSection />
                <AboutSection />
                <SpeakersSection />
                <ScheduleSection />
                <CTASection />
            </main>
        </>
    )
}