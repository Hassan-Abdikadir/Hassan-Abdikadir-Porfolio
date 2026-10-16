import { useState, useEffect } from 'react'
import {
  fetchProjects,
  fetchSkills,
  fetchExperiences,
  fetchCertifications,
  fetchTestimonials,
  fetchMetrics,
  fetchArticles
} from '../services/portfolioService'
import { realPortfolioData } from '../constants/portfolioData'

export function usePortfolioData() {
  const [data, setData] = useState({
    developer: realPortfolioData.developer,
    projects: realPortfolioData.projects,
    skills: realPortfolioData.skills,
    experiences: realPortfolioData.experiences,
    certifications: realPortfolioData.certifications,
    testimonials: realPortfolioData.testimonials,
    metrics: realPortfolioData.metrics,
    articles: realPortfolioData.articles,
    loading: true
  })

  useEffect(() => {
    let isMounted = true

    const loadAllData = async () => {
      try {
        const [projects, skills, experiences, certifications, testimonials, metrics, articles] = await Promise.all([
          fetchProjects(),
          fetchSkills(),
          fetchExperiences(),
          fetchCertifications(),
          fetchTestimonials(),
          fetchMetrics(),
          fetchArticles()
        ])

        if (isMounted) {
          setData(prev => ({
            ...prev,
            projects: projects || prev.projects,
            skills: skills || prev.skills,
            experiences: experiences || prev.experiences,
            certifications: certifications || prev.certifications,
            testimonials: testimonials || prev.testimonials,
            metrics: metrics || prev.metrics,
            articles: articles || prev.articles,
            loading: false
          }))
        }
      } catch (err) {
        if (isMounted) setData(prev => ({ ...prev, loading: false }))
      }
    }

    loadAllData()
    return () => { isMounted = false }
  }, [])

  return data
}
