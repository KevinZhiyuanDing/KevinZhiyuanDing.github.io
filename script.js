function renderProfile(profile) {
    if (!profile) return;

    const heroName = document.getElementById('hero-name');
    if (heroName && profile.name) heroName.textContent = profile.name;

    const navBrand = document.getElementById('nav-brand');
    if (navBrand && profile.name) navBrand.textContent = profile.name;

    const headerRole = document.getElementById('header-role');
    if (headerRole && profile.role) headerRole.textContent = profile.role;

    const headerLocation = document.getElementById('header-location');
    if (headerLocation) {
        const parts = [profile.locationShort, profile.headerSubtitle].filter(Boolean);
        headerLocation.textContent = parts.join(' · ');
    }

    const footerText = document.getElementById('footer-text');
    if (footerText && profile.name) {
        const location = profile.locationShort || profile.location || '';
        footerText.textContent = location ? `${profile.name} · ${location}` : profile.name;
    }

    if (profile.social) {
        const { github, linkedin, email } = profile.social;

        const githubLinks = [document.getElementById('hero-github'), document.getElementById('contact-github')];
        const linkedinLinks = [document.getElementById('hero-linkedin'), document.getElementById('contact-linkedin')];
        const emailLinks = document.querySelectorAll('.contact-email');

        githubLinks.forEach(el => { if (el && github) el.href = github; });
        linkedinLinks.forEach(el => { if (el && linkedin) el.href = linkedin; });
        emailLinks.forEach(el => { if (el && email) el.href = `mailto:${email}`; });
    }
}

function renderContact(contact, social) {
    const el = document.getElementById('contact-text');
    if (!el || !contact?.text || !social) return;

    const emailLink = `<a href="mailto:${social.email}" class="contact-email">email</a>`;
    const githubLink = `<a href="${social.github}" target="_blank" rel="noopener noreferrer me" id="contact-github">GitHub</a>`;
    const linkedinLink = `<a href="${social.linkedin}" target="_blank" rel="noopener noreferrer me" id="contact-linkedin">LinkedIn</a>`;

    el.innerHTML = contact.text
        .replace('{{email}}', emailLink)
        .replace('{{github}}', githubLink)
        .replace('{{linkedin}}', linkedinLink);
}

function renderAbout(about) {
    const el = document.querySelector('.about-text');
    if (el && about && about.text) {
        el.textContent = about.text;
    }
}

function renderEducation(educationList) {
    const section = document.querySelector('#education');
    if (!section || !Array.isArray(educationList)) return;

    section.innerHTML = `
        <h2>Education</h2>
        ${educationList.map(edu => `
            <article class="entry-item">
                <div class="entry-header">
                    <span class="entry-org">${edu.school || ''}${edu.location ? ` &middot; ${edu.location}` : ''}</span>
                    <span class="entry-date">${edu.graduation || ''}</span>
                </div>
                <p class="entry-title">${edu.degree || ''}</p>
                ${Array.isArray(edu.links) && edu.links.length ? `
                    <div class="entry-links">
                        ${edu.links.map(l => `
                            <a href="${l.url}" target="_blank" rel="noopener noreferrer">
                                <i class="fas fa-file-pdf" aria-hidden="true"></i>${l.label}
                            </a>
                        `).join('')}
                    </div>
                ` : ''}
                ${Array.isArray(edu.highlights) && edu.highlights.length ? `
                    <ul class="bullet-list">
                        ${edu.highlights.map(h => `<li>${h}</li>`).join('')}
                    </ul>
                ` : ''}
            </article>
        `).join('')}
    `;
}

function renderEntrySection(sectionSelector, heading, entryList) {
    const section = document.querySelector(sectionSelector);
    if (!section || !Array.isArray(entryList)) return;

    section.innerHTML = `
        <h2>${heading}</h2>
        ${entryList.map(exp => `
            <article class="entry-item">
                <div class="entry-header">
                    <span class="entry-org">${exp.company || ''}${exp.location ? ` &middot; ${exp.location}` : ''}</span>
                    <span class="entry-date">${exp.period || ''}</span>
                </div>
                <p class="entry-title">${exp.title || ''}</p>
                ${Array.isArray(exp.links) && exp.links.length ? `
                    <div class="entry-links">
                        ${exp.links.map(l => `
                            <a href="${l.url}" target="_blank" rel="noopener noreferrer">
                                <i class="fas fa-external-link-alt" aria-hidden="true"></i>${l.label}
                            </a>
                        `).join('')}
                    </div>
                ` : ''}
                ${Array.isArray(exp.description) && exp.description.length ? `
                    <ul class="bullet-list">
                        ${exp.description.map(d => `<li>${d}</li>`).join('')}
                    </ul>
                ` : ''}
            </article>
        `).join('')}
    `;
}

function renderExperience(experienceList) {
    renderEntrySection('#experience', 'Work Experience', experienceList);
}

function renderResearchExperience(researchList) {
    renderEntrySection('#research-experience', 'Research Experience', researchList);
}

function renderDesignTeamExperience(designTeamList) {
    renderEntrySection('#design-team-experience', 'Design Team Experience', designTeamList);
}

function renderProjects(projects) {
    const section = document.querySelector('#projects');
    if (!section || !Array.isArray(projects)) return;

    section.innerHTML = `
        <h2>Projects</h2>
        ${projects.map(p => `
            <article class="project-item">
                ${p.image ? `
                    <div class="project-image">
                        <img src="${p.image}" alt="${p.name || 'Project'} screenshot" loading="lazy" decoding="async">
                    </div>
                ` : ''}
                <div class="project-content">
                    <div class="project-header">
                        <span class="project-name">${p.name || ''}</span>
                        ${p.period ? `<span class="project-date">${p.period}</span>` : ''}
                    </div>
                    ${Array.isArray(p.links) && p.links.length ? `
                        <div class="project-links">
                            ${p.links.map(l => `
                                <a href="${l.url}" target="_blank" rel="noopener noreferrer">
                                    <i class="fas fa-external-link-alt" aria-hidden="true"></i>${l.label}
                                </a>
                            `).join('')}
                        </div>
                    ` : p.github ? `
                        <div class="project-links">
                            <a href="${p.github}" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-github" aria-hidden="true"></i>GitHub
                            </a>
                        </div>
                    ` : ''}
                    ${Array.isArray(p.technologies) && p.technologies.length ? `
                        <p class="project-tech">${p.technologies.join(' &middot; ')}</p>
                    ` : ''}
                    ${Array.isArray(p.description) && p.description.length ? `
                        <ul class="bullet-list">
                            ${p.description.map(d => `<li>${d}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
            </article>
        `).join('')}
    `;
}

function renderSkills(skills) {
    const grid = document.querySelector('.skills-grid');
    if (!grid || !Array.isArray(skills)) return;

    grid.innerHTML = skills.map(cat => `
        <div class="skill-group">
            <div class="skill-group-label">${cat.category}</div>
            <div class="skill-tags">
                ${Array.isArray(cat.items) ? cat.items.map(s => `
                    <span class="skill-tag">${s}</span>
                `).join('') : ''}
            </div>
        </div>
    `).join('');
}

function renderAwards(awards) {
    const section = document.querySelector('#awards');
    if (!section || !Array.isArray(awards)) return;

    section.innerHTML = `
        <h2>Awards</h2>
        <div class="awards-list">
            ${awards.map(a => `<div class="award-item">${a}</div>`).join('')}
        </div>
    `;
}

async function loadWebsiteData() {
    const response = await fetch('data.json');
    if (!response.ok) throw new Error(`Failed to load data.json: ${response.status}`);
    return response.json();
}

async function updateContent() {
    try {
        const data = await loadWebsiteData();
        renderProfile(data.profile);
        renderAbout(data.about);
        renderEducation(data.education);
        renderExperience(data.experience);
        renderResearchExperience(data.researchExperience);
        renderDesignTeamExperience(data.designTeamExperience);
        renderProjects(data.projects);
        renderSkills(data.skills);
        renderAwards(data.awards);
        renderContact(data.contact, data.profile?.social);
    } catch (error) {
        console.error('Website data not loaded', error);
    }
}

function setupMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
        const icon = toggle.querySelector('i');
        if (icon) icon.className = open ? 'fas fa-times' : 'fas fa-bars';
    });

    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            links.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            const icon = toggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        });
    });
}

let refreshNavScrollSpy = () => {};

function setupNavScrollSpy() {
    const nav = document.querySelector('.nav-links');
    if (!nav) return () => {};

    const items = Array.from(nav.querySelectorAll('a[href^="#"]'))
        .map(link => ({
            link,
            section: document.querySelector(link.getAttribute('href')),
        }))
        .filter(item => item.section);

    if (!items.length) return () => {};

    const navHeight = () => parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
        10
    ) || 56;

    let scrollSpyLocked = false;
    let pendingNavId = null;
    let scrollSpyLockTimer;

    const setActive = (id) => {
        items.forEach(({ link }) => {
            const active = link.getAttribute('href') === `#${id}`;
            if (active) link.setAttribute('aria-current', 'page');
            else link.removeAttribute('aria-current');
        });
    };

    const updateActiveFromScroll = () => {
        if (scrollSpyLocked) return;

        const offset = navHeight() + 8;
        let currentId = items[0].section.id;

        for (let i = items.length - 1; i >= 0; i--) {
            const { section } = items[i];
            if (section.getBoundingClientRect().top <= offset) {
                currentId = section.id;
                break;
            }
        }

        setActive(currentId);
    };

    const finishNavScroll = () => {
        if (!pendingNavId) return;
        setActive(pendingNavId);
        pendingNavId = null;
        scrollSpyLocked = false;
        clearTimeout(scrollSpyLockTimer);
    };

    const lockScrollSpy = () => {
        scrollSpyLocked = true;
        clearTimeout(scrollSpyLockTimer);
        scrollSpyLockTimer = setTimeout(finishNavScroll, 1000);
    };

    items.forEach(({ link, section }) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            pendingNavId = section.id;
            setActive(section.id);
            lockScrollSpy();
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    window.addEventListener('scroll', updateActiveFromScroll, { passive: true });
    window.addEventListener('resize', updateActiveFromScroll, { passive: true });
    window.addEventListener('scrollend', () => {
        if (pendingNavId) finishNavScroll();
        else updateActiveFromScroll();
    }, { passive: true });
    updateActiveFromScroll();

    return updateActiveFromScroll;
}

document.addEventListener('DOMContentLoaded', async () => {
    setupMobileNav();
    refreshNavScrollSpy = setupNavScrollSpy();
    await updateContent();
    refreshNavScrollSpy();
});
