import React from 'react';
import { Code2, Award, GraduationCap } from 'lucide-react';
import { educationHistory, experienceHistory, statsData } from '../data/portofolioData';

const statIcons = {
  'stats-projects': Code2,
  'stats-certificates': Award,
  'stats-awards': GraduationCap
};

export default function EducationExperience() {
  return (
    <section className="experience-section" aria-labelledby="experience-section-heading">
      <div className="experience-container">
        {/* Education & Experience Columns */}
        <div className="experience-columns">
          {/* Education */}
          <div className="experience-group">
            <h2>Pendidikan</h2>
            {educationHistory.map((edu) => (
              <article key={edu.id} className="experience-card">
                <div className="experience-logo">
                  <img src={edu.logo} alt={`Logo ${edu.institution}`} />
                </div>
                <div className="experience-card-copy">
                  <h3>{edu.institution}</h3>
                  <p>{edu.degree}</p>
                  <span className="experience-date">{edu.period}</span>
                </div>
              </article>
            ))}
          </div>

          {/* Experience */}
          <div className="experience-group">
            <h2>Pengalaman</h2>
            {experienceHistory.map((exp) => (
              <article key={exp.id} className="experience-card">
                <div className="experience-logo">
                  <img src={exp.logo} alt={`Logo ${exp.institution}`} />
                </div>
                <div className="experience-card-copy">
                  <h3>{exp.institution}</h3>
                  <p>{exp.role}</p>
                  {exp.period && <span className="experience-date">{exp.period}</span>}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* 3 Stat Cards */}
        <div className="experience-stats" aria-label="Statistik portofolio">
          {statsData.map((stat) => {
            const Icon = statIcons[stat.id] || Code2;
            return (
              <article key={stat.id} className="experience-stat-card">
                <div className="experience-stat-top">
                  <strong>{stat.value}</strong>
                  <Icon size={20} className="experience-stat-inline-icon" aria-hidden="true" />
                </div>
                <h3>{stat.label}</h3>
                <p>{stat.subtext}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

