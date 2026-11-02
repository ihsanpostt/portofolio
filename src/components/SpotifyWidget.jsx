import React, { useState } from 'react';
import { Music2, ExternalLink } from 'lucide-react';

export default function SpotifyWidget() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <section className="spotify-section" aria-labelledby="spotify-section-heading">
      <div className="spotify-card">
        {/* Copy Column */}
        <div className="spotify-copy">
          <h2 id="spotify-title">
            Sedikit Musik.
            <br />
            <span>Banyak Inspirasi.</span>
          </h2>
          <p className="spotify-description">
            Musik yang menemani fokus saya saat merancang antarmuka dan menulis kode. Intip daftar lagu yang menemani aktivitas produktif harian saya di Spotify.
          </p>
          <a
            className="spotify-open-link"
            href="https://open.spotify.com/playlist/3XXwLc91K6JYhtotQO98S4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Music2 size={17} />
            <span>Daftar Putar di Spotify</span>
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Spotify Player Frame with Skeleton Loader */}
        <div className="spotify-player-frame">
          {!iframeLoaded && (
            <div className="spotify-player-skeleton" aria-hidden="true">
              <div className="spotify-skeleton-header">
                <span className="skeleton-block spotify-skeleton-cover" />
                <div className="spotify-skeleton-copy">
                  <span className="skeleton-block spotify-skeleton-title" />
                  <span className="skeleton-block spotify-skeleton-subtitle" />
                  <span className="skeleton-block spotify-skeleton-saved" />
                </div>
                <span className="skeleton-block spotify-skeleton-brand" />
              </div>
              <span className="skeleton-block spotify-skeleton-preview-label" />
              <div className="spotify-skeleton-tracks">
                {[0, 1, 2].map((idx) => (
                  <div key={idx} className="spotify-skeleton-track">
                    <span className="skeleton-block spotify-skeleton-track-number" />
                    <div className="spotify-skeleton-track-copy">
                      <span className="skeleton-block spotify-skeleton-track-title" />
                      <span className="skeleton-block spotify-skeleton-track-artist" />
                    </div>
                    <span className="skeleton-block spotify-skeleton-track-duration" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <iframe
            className="spotify-embed"
            title="Spotify playlist: Daily Rotation"
            src="https://open.spotify.com/embed/playlist/3XXwLc91K6JYhtotQO98S4?utm_source=generator&theme=0&si=8159cd1856464587"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            onLoad={() => setIframeLoaded(true)}
          />
        </div>
      </div>
    </section>
  );
}

