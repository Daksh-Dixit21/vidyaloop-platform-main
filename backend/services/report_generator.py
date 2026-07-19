import math
import uuid
from datetime import datetime, timezone
from database import reports_collection

DIM_META = {
    "social_energy": {"label": "Social Energy", "icon": "🗣️", "section": "personality",
        "what": "Measures where you draw your energy from — social interactions or solitary reflection.",
        "why": "Understanding your social energy helps you choose the right study environments, team dynamics, and career paths."},
    "conscientiousness": {"label": "Conscientiousness & Discipline", "icon": "📋", "section": "personality",
        "what": "Measures your organization, reliability, attention to detail, and ability to follow through on commitments.",
        "why": "Discipline is the foundation of academic success and professional achievement."},
    "curiosity": {"label": "Curiosity & Openness", "icon": "🔬", "section": "personality",
        "what": "Measures your desire to explore, question, and understand the world around you.",
        "why": "Curiosity drives lifelong learning and is the engine behind innovation and discovery."},
    "collaboration": {"label": "Collaboration & Empathy", "icon": "🤝", "section": "personality",
        "what": "Measures your ability to understand others' feelings and work effectively in teams.",
        "why": "Empathy and teamwork are essential skills in virtually every career and life situation."},
    "adaptability": {"label": "Adaptability & Resilience", "icon": "🔄", "section": "personality",
        "what": "Measures how well you handle change, recover from setbacks, and adjust to new situations.",
        "why": "In a rapidly changing world, adaptability is one of the most valuable life skills."},
    "visual_learning": {"label": "Visual Learning Preference", "icon": "👁️", "section": "learning_style",
        "what": "Measures how effectively you learn through images, diagrams, charts, and visual representations.",
        "why": "Knowing your visual preference helps you choose the right study tools and note-taking methods."},
    "experiential_learning": {"label": "Practical & Experiential Learning", "icon": "🔧", "section": "learning_style",
        "what": "Measures your preference for learning through hands-on experience, experiments, and real-world application.",
        "why": "Practical learners thrive when they can apply concepts rather than just read about them."},
    "independent_learning": {"label": "Independent Learning", "icon": "📖", "section": "learning_style",
        "what": "Measures your ability and preference for taking ownership of your own learning journey.",
        "why": "Independent learning skills are crucial for higher education and lifelong professional growth."},
    "collaborative_learning": {"label": "Collaborative Learning", "icon": "👥", "section": "learning_style",
        "what": "Measures how effectively you learn through discussion, teamwork, and peer interaction.",
        "why": "Collaborative skills prepare you for team-based work environments and group projects."},
    "structured_vs_exploratory": {"label": "Structured vs Exploratory Learning", "icon": "🧭", "section": "learning_style",
        "what": "Measures whether you prefer clear instructions and defined paths or open-ended discovery.",
        "why": "Understanding this preference helps you choose study methods that feel natural and effective."},
    "verbal_ability": {"label": "Verbal Ability", "icon": "✍️", "section": "skills",
        "what": "Measures your ability to understand, interpret, and communicate through language.",
        "why": "Verbal ability influences reading comprehension, writing, communication, and academic performance."},
    "numerical_ability": {"label": "Numerical Ability", "icon": "🔢", "section": "skills",
        "what": "Measures your ability to understand, analyze, and work with numbers and quantitative data.",
        "why": "Numerical skills are essential for STEM fields, finance, data analysis, and everyday decision-making."},
    "logical_reasoning": {"label": "Logical Reasoning", "icon": "🧩", "section": "skills",
        "what": "Measures your ability to analyze problems, identify patterns, and draw valid conclusions.",
        "why": "Logical reasoning is the foundation of critical thinking and problem-solving in any field."},
    "creative_thinking": {"label": "Creative Thinking", "icon": "🎨", "section": "skills",
        "what": "Measures your ability to generate original ideas, think outside the box, and find innovative solutions.",
        "why": "Creativity is increasingly valued in the modern workforce across all industries."},
    "spatial_ability": {"label": "Spatial & Visual Reasoning", "icon": "📐", "section": "skills",
        "what": "Measures your ability to visualize shapes, patterns, and 3D objects in your mind.",
        "why": "Spatial skills are crucial for engineering, architecture, design, and many STEM careers."},
    "leadership_potential": {"label": "Leadership Potential", "icon": "👑", "section": "skills",
        "what": "Measures your natural ability to guide, motivate, and organize others toward a goal.",
        "why": "Leadership skills open doors to management, entrepreneurship, and community impact."},
    "investigative_interest": {"label": "Investigative Interest", "icon": "🔍", "section": "career",
        "what": "Measures your interest in research, analysis, scientific inquiry, and understanding how things work.",
        "why": "Investigative interests align with careers in science, research, medicine, and technology."},
    "artistic_interest": {"label": "Artistic Interest", "icon": "🎭", "section": "career",
        "what": "Measures your interest in creative expression, design, aesthetics, and artistic endeavors.",
        "why": "Artistic interests align with careers in design, media, writing, and creative industries."},
    "social_interest": {"label": "Social Interest", "icon": "❤️", "section": "career",
        "what": "Measures your interest in helping, teaching, counseling, and supporting others.",
        "why": "Social interests align with careers in education, healthcare, social work, and community service."},
    "enterprising_interest": {"label": "Enterprising Interest", "icon": "💼", "section": "career",
        "what": "Measures your interest in leading, persuading, organizing, and business ventures.",
        "why": "Enterprising interests align with careers in business, management, law, and entrepreneurship."},
    "conventional_interest": {"label": "Conventional Interest", "icon": "📊", "section": "career",
        "what": "Measures your interest in organized, detail-oriented work with data and procedures.",
        "why": "Conventional interests align with careers in accounting, administration, and data management."},
    "realistic_interest": {"label": "Realistic Interest", "icon": "⚙️", "section": "career",
        "what": "Measures your interest in hands-on, practical work with tools, machines, and physical objects.",
        "why": "Realistic interests align with careers in engineering, agriculture, mechanics, and skilled trades."},
}

SECTION_META = {
    "personality": {"label": "Personality Profile", "icon": "🧠", "color": "#4EC0F4",
        "intro": "Your personality defines how you interact with the world, handle challenges, and relate to others. This section reveals the core traits that make you unique."},
    "learning_style": {"label": "Learning Style Profile", "icon": "📚", "color": "#8b5cf6",
        "intro": "Everyone learns differently. Understanding your learning style helps you study more effectively and choose environments where you thrive."},
    "skills": {"label": "Skills & Abilities Profile", "icon": "⚡", "color": "#22c55e",
        "intro": "Your natural abilities shape what you can do best. This section measures your aptitudes across verbal, numerical, logical, creative, spatial, and leadership domains."},
    "career": {"label": "Career Interest Profile", "icon": "🚀", "color": "#f59e0b",
        "intro": "Your interests point toward careers you'll find fulfilling. This section maps your natural inclinations across six career domains."},
}

THEME_META = {
    "Researcher": {"icon": "🔬", "desc": "Curiosity, investigation, knowledge, discovery"},
    "Innovator": {"icon": "💡", "desc": "Creativity, experimentation, new ideas"},
    "Creator": {"icon": "🎨", "desc": "Expression, design, imagination, originality"},
    "Builder": {"icon": "🔨", "desc": "Hands-on creation, implementation, practical problem-solving"},
    "Strategist": {"icon": "♟️", "desc": "Planning, systems thinking, long-term thinking"},
    "Leader": {"icon": "👑", "desc": "Influence, initiative, responsibility"},
    "Educator": {"icon": "📖", "desc": "Teaching, helping, mentoring, developing others"},
    "Entrepreneur": {"icon": "🚀", "desc": "Opportunity creation, ownership, growth"},
    "Problem Solver": {"icon": "🧩", "desc": "Analysis, solutions, critical thinking"},
    "Communicator": {"icon": "🗣️", "desc": "Expression, persuasion, connection"},
    "Analyst": {"icon": "📊", "desc": "Data, logic, evidence, objective thinking"},
    "Change Maker": {"icon": "🌍", "desc": "Impact, improvement, contribution, social influence"},
}


def _color(pct):
    if pct >= 76: return "#22c55e"
    if pct >= 51: return "#3b82f6"
    if pct >= 26: return "#f59e0b"
    return "#ef4444"

def _level(pct):
    if pct >= 76: return "Exceptional"
    if pct >= 51: return "Proficient"
    if pct >= 26: return "Developing"
    return "Needs Support"

def _ring(score, size=140, label="", sublabel=""):
    c = _color(score)
    circ = 2 * math.pi * 52
    dash = (score / 100) * circ
    return f'''<div style="text-align:center;display:inline-block;">
      <svg width="{size}" height="{size}" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="52" fill="none" stroke="#f1f5f9" stroke-width="10"/>
        <circle cx="60" cy="60" r="52" fill="none" stroke="{c}" stroke-width="10" stroke-linecap="round" stroke-dasharray="{dash} {circ}" transform="rotate(-90 60 60)" style="filter:drop-shadow(0 2px 6px {c}44);"/>
      </svg>
      <div style="margin-top:-{size-20}px;margin-bottom:30px;">
        <div style="font-size:32px;font-weight:800;color:{c};">{int(score)}%</div>
        <div style="font-size:12px;color:#64748b;margin-top:2px;">{label}</div>
        <div style="font-size:11px;color:{c};font-weight:600;">{sublabel}</div>
      </div></div>'''

def _dim_page(dim_key, scores, sec_meta, page_num):
    """Generate a full page for a single dimension."""
    d = scores.get("dimensions", {}).get(dim_key, {})
    norm = d.get("normalized", 0)
    c = _color(norm)
    meta = DIM_META.get(dim_key, {"label": dim_key, "icon": "📌", "what": "", "why": ""})
    interp = d.get("interpretation", "")

    traits_high = {
        "social_energy": ["You naturally engage with others and thrive in group settings", "Your confidence in social situations is a major asset", "You energize those around you with your presence"],
        "conscientiousness": ["You are highly organized and reliable", "Your attention to detail sets you apart", "You consistently follow through on commitments"],
        "curiosity": ["You have a powerful drive to explore and understand", "Your questioning nature leads to deep insights", "You naturally seek out new knowledge and experiences"],
        "collaboration": ["You deeply understand and care about others' feelings", "Your empathy makes you an excellent team member", "You create positive environments wherever you go"],
        "adaptability": ["You thrive in changing environments", "Setbacks make you stronger, not weaker", "You see challenges as opportunities to grow"],
        "visual_learning": ["You process visual information exceptionally well", "Diagrams, charts, and videos are powerful learning tools for you", "You have strong visual memory and pattern recognition"],
        "experiential_learning": ["You learn best through direct experience", "Hands-on projects are where you shine", "You quickly apply concepts to real-world situations"],
        "independent_learning": ["You are a self-directed learner who takes ownership", "You explore topics proactively without being told", "Your initiative and curiosity drive your growth"],
        "collaborative_learning": ["You learn powerfully through discussion and teamwork", "Peer interaction deepens your understanding", "You bring out the best in group learning settings"],
        "structured_vs_exploratory": ["You thrive in open-ended, discovery-based environments", "Your curiosity leads you to explore multiple approaches", "You are comfortable with ambiguity and experimentation"],
        "verbal_ability": ["You communicate ideas with clarity and precision", "Language is a natural strength for you", "You excel in reading, writing, and verbal expression"],
        "numerical_ability": ["You think clearly with numbers and data", "Mathematical concepts come naturally to you", "You enjoy working with quantitative information"],
        "logical_reasoning": ["You analyze problems systematically and thoroughly", "Your logical thinking is a core intellectual strength", "You identify patterns and draw valid conclusions quickly"],
        "creative_thinking": ["You generate original and innovative ideas", "Your imagination is a powerful asset", "You approach problems from unique and creative angles"],
        "spatial_ability": ["You visualize shapes, patterns, and 3D objects effortlessly", "Your spatial reasoning is a significant strength", "You excel at understanding visual and spatial relationships"],
        "leadership_potential": ["You naturally guide and inspire others", "Your initiative and responsibility stand out", "People look to you for direction and motivation"],
        "investigative_interest": ["You are drawn to research, analysis, and discovery", "Understanding how things work fascinates you", "Scientific and analytical careers align with your interests"],
        "artistic_interest": ["You are drawn to creative expression and design", "Aesthetics and originality are important to you", "Creative industries align with your natural interests"],
        "social_interest": ["You are motivated by helping and supporting others", "Making a difference in people's lives drives you", "Service-oriented careers align with your values"],
        "enterprising_interest": ["You are drawn to leadership, business, and influence", "Organizing people and resources excites you", "Entrepreneurial and management roles align with your drive"],
        "conventional_interest": ["You enjoy organized, detail-oriented work", "Structure and precision are your strengths", "Administrative and analytical roles suit your preferences"],
        "realistic_interest": ["You enjoy working with your hands and practical tasks", "Building, fixing, and creating tangible things excites you", "Technical and hands-on careers align with your interests"],
    }
    traits_low = {
        "social_energy": ["You recharge through quiet, solitary activities", "You prefer deep one-on-one conversations over large groups", "Your thoughtful nature is a strength in focused work"],
        "conscientiousness": ["You prefer flexibility over rigid structure", "Your spontaneity can be a creative advantage", "You work well when given freedom to choose your approach"],
        "curiosity": ["You prefer familiar, well-understood topics", "Your focused approach ensures depth over breadth", "You excel when given clear, specific learning goals"],
        "collaboration": ["You prefer working independently with full control", "Your self-reliance is a strength in individual tasks", "You produce your best work in quiet, focused environments"],
        "adaptability": ["You prefer stability and predictable routines", "Your consistency and reliability are strengths", "You excel when given time to prepare for changes"],
        "visual_learning": ["You prefer verbal explanations and discussions", "Your text-based learning skills are strong", "You process information well through reading and conversation"],
        "experiential_learning": ["You prefer understanding theory before practice", "Your conceptual approach ensures deep understanding", "You learn effectively through explanations and reading"],
        "independent_learning": ["You benefit from guidance and structured instruction", "Your collaborative approach brings diverse perspectives", "You excel with clear expectations and regular feedback"],
        "collaborative_learning": ["You prefer processing ideas independently first", "Your independent thinking produces unique insights", "You produce your best work in focused, individual settings"],
        "structured_vs_exploratory": ["You prefer clear instructions and defined outcomes", "Your structured approach ensures thoroughness", "You excel when expectations are clearly communicated"],
        "verbal_ability": ["You prefer visual or practical learning approaches", "Your strengths may lie in non-verbal domains", "Focused reading practice can strengthen this area"],
        "numerical_ability": ["You may prefer qualitative over quantitative tasks", "Your strengths may lie in verbal or creative domains", "Regular math practice can build confidence and skill"],
        "logical_reasoning": ["You may prefer creative or practical approaches", "Your strengths may lie in other cognitive domains", "Logical puzzles and games can help develop this skill"],
        "creative_thinking": ["You prefer structured, proven approaches", "Your reliability and consistency are strengths", "Exposure to creative activities can spark innovation"],
        "spatial_ability": ["You may prefer text-based or verbal reasoning", "Your strengths may lie in other cognitive areas", "Spatial puzzles and visual activities can help develop this skill"],
        "leadership_potential": ["You prefer collaborative, shared leadership", "Your team-player attitude is valuable in group settings", "Taking small leadership roles can build confidence"],
        "investigative_interest": ["You may prefer practical or creative activities", "Your interests may lie in other career domains", "Exposure to research activities can spark new interests"],
        "artistic_interest": ["You may prefer analytical or practical activities", "Your interests may lie in other career domains", "Creative hobbies can help develop this interest area"],
        "social_interest": ["You may prefer technical or independent work", "Your interests may lie in other career domains", "Volunteer experiences can help you discover social interests"],
        "enterprising_interest": ["You may prefer working behind the scenes", "Your interests may lie in supportive or technical roles", "Taking initiative in small projects can build confidence"],
        "conventional_interest": ["You may prefer creative or flexible work", "Your interests may lie in less structured environments", "Organizational practice can help develop this interest area"],
        "realistic_interest": ["You may prefer intellectual or creative work", "Your interests may lie in non-physical domains", "Hands-on projects can help discover practical interests"],
    }

    high_traits = traits_high.get(dim_key, ["You demonstrate strong capability in this area"])
    low_traits = traits_low.get(dim_key, ["This area may benefit from focused development"])

    if norm >= 51:
        traits_list = high_traits
        trait_title = "Key Characteristics"
        trait_color = "#22c55e"
    else:
        traits_list = low_traits
        trait_title = "What This Means"
        trait_color = "#f59e0b"

    traits_html = "".join(f'<li style="margin-bottom:6px;font-size:13px;color:#334155;">{t}</li>' for t in traits_list)

    return f'''
    <div class="page" style="page-break-before:always;padding:28px 36px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="font-size:24px;">{meta["icon"]}</span>
          <div>
            <h2 style="font-size:18px;color:#1e293b;margin:0;">{meta["label"]}</h2>
            <div style="font-size:11px;color:{sec_meta["color"]};font-weight:600;">{sec_meta["label"]}</div>
          </div>
        </div>
        <div style="font-size:10px;color:#94a3b8;">Page {page_num}</div>
      </div>

      <div style="background:linear-gradient(135deg,{sec_meta["color"]}08,{sec_meta["color"]}03);border:1px solid {sec_meta["color"]}20;border-radius:16px;padding:20px;margin-bottom:20px;">
        <div style="display:flex;gap:24px;align-items:center;">
          <div style="text-align:center;">
            {_ring(norm, 130, "Score", _level(norm))}
          </div>
          <div style="flex:1;">
            <h3 style="font-size:13px;color:#64748b;margin-bottom:6px;">What This Measures</h3>
            <p style="font-size:12.5px;color:#334155;line-height:1.6;margin-bottom:12px;">{meta.get("what", "")}</p>
            <h3 style="font-size:13px;color:#64748b;margin-bottom:6px;">Why This Matters</h3>
            <p style="font-size:12.5px;color:#334155;line-height:1.6;">{meta.get("why", "")}</p>
          </div>
        </div>
      </div>

      <div style="margin-bottom:20px;">
        <h3 style="font-size:14px;color:{trait_color};margin-bottom:10px;display:flex;align-items:center;gap:6px;">
          <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:{trait_color};"></span>
          {trait_title}
        </h3>
        <div style="background:white;border:1px solid #f1f5f9;border-radius:12px;padding:16px;">
          <ul style="padding-left:18px;margin:0;">{traits_html}</ul>
        </div>
      </div>

      <div style="background:#f8fafc;border-radius:12px;padding:16px;">
        <h3 style="font-size:13px;color:#64748b;margin-bottom:8px;">Detailed Interpretation</h3>
        <p style="font-size:12.5px;color:#334155;line-height:1.7;">{interp}</p>
      </div>
    </div>'''


def _bar(label, score, icon="", accent="#4EC0F4"):
    c = _color(score)
    return f'''<div style="margin-bottom:14px;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
        <span style="font-size:14px;">{icon}</span>
        <span style="font-size:12px;font-weight:600;color:#1e293b;flex:1;">{label}</span>
        <span style="font-size:16px;font-weight:800;color:{c};">{int(score)}%</span>
        <span style="font-size:9px;font-weight:600;color:{c};background:{c}18;padding:2px 6px;border-radius:20px;">{_level(score)}</span>
      </div>
      <div style="background:#f1f5f9;border-radius:6px;height:10px;overflow:hidden;">
        <div style="background:linear-gradient(90deg,{c},{c}bb);width:{score}%;height:10px;border-radius:6px;"></div>
      </div></div>'''


def _radar_svg(dim_scores, size=300):
    labels = list(dim_scores.keys())[:8]
    n = len(labels)
    if n < 3: return ""
    cx, cy, r = size // 2, size // 2, size // 2 - 45
    rings = ""
    for rv in [25, 50, 75, 100]:
        rr = r * rv / 100
        rings += f'<circle cx="{cx}" cy="{cy}" r="{rr}" fill="none" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3,3"/>'
    axes = ""
    lbls = ""
    pts = []
    for i, lbl in enumerate(labels):
        angle = (2 * math.pi * i / n) - math.pi / 2
        val = dim_scores[lbl] / 100
        x = cx + r * val * math.cos(angle)
        y = cy + r * val * math.sin(angle)
        pts.append((x, y))
        lx = cx + (r + 28) * math.cos(angle)
        ly = cy + (r + 28) * math.sin(angle)
        axes += f'<line x1="{cx}" y1="{cy}" x2="{cx + r * math.cos(angle)}" y2="{cy + r * math.sin(angle)}" stroke="#e2e8f0" stroke-width="1"/>'
        lbls += f'<text x="{lx}" y="{ly}" text-anchor="middle" dominant-baseline="middle" font-size="10" fill="#475569" font-weight="500">{lbl[:12]}</text>'
    poly = " ".join(f"{x},{y}" for x, y in pts)
    dots = ""
    for x, y in pts:
        dots += f'<circle cx="{x}" cy="{y}" r="4" fill="white" stroke="#4EC0F4" stroke-width="2.5"/>'
    return f'''<svg width="{size}" height="{size}" viewBox="0 0 {size} {size}">
      <defs><linearGradient id="rf" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4EC0F4;stop-opacity:0.2"/><stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.2"/>
      </linearGradient></defs>
      {rings}{axes}
      <polygon points="{poly}" fill="url(#rf)" stroke="#4EC0F4" stroke-width="2"/>
      {dots}{lbls}</svg>'''


def _hbar(items):
    html = ""
    for label, score, color in items:
        w = max(score * 0.85, 5)
        html += f'''<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <div style="width:90px;text-align:right;font-size:10px;color:#475569;font-weight:500;">{label}</div>
          <div style="flex:1;background:#f1f5f9;border-radius:5px;height:16px;overflow:hidden;">
            <div style="background:linear-gradient(90deg,{color},{color}bb);width:{w}%;height:16px;border-radius:5px;display:flex;align-items:center;justify-content:flex-end;padding-right:4px;">
              <span style="font-size:9px;color:white;font-weight:700;">{int(score)}%</span>
            </div></div></div>'''
    return html


def _text_block(title, bullets, accent="#4EC0F4"):
    items = "".join(f"<li>{b}</li>" for b in bullets)
    return f'''<div style="margin-bottom:16px;padding:14px 18px;background:#f8fafc;border-left:4px solid {accent};border-radius:0 10px 10px 0;">
      <h4 style="font-size:13px;color:#1e293b;margin-bottom:6px;">{title}</h4>
      <ul style="padding-left:16px;margin:0;">{items}</ul></div>'''


def _generate_html(student_name, class_level, school_name, scores, assessment_date):
    dims = scores.get("dimensions", {})
    themes = scores.get("themes", {})
    theme_rankings = scores.get("theme_rankings", [])
    frs = scores.get("future_readiness_score", 0)
    fsi = scores.get("future_success_index", 0)
    top_strengths = scores.get("top_strengths", [])
    growth_areas = scores.get("growth_areas", [])
    hidden_strengths = scores.get("hidden_strengths", [])
    blind_spots = scores.get("blind_spots", [])
    all_norms = [v.get("normalized", 0) for v in dims.values()]
    overall = round(sum(all_norms) / len(all_norms), 1) if all_norms else 0

    # Radar
    radar_dims = {}
    for d in ["social_energy", "conscientiousness", "curiosity", "collaboration", "adaptability",
              "verbal_ability", "numerical_ability", "logical_reasoning", "creative_thinking"]:
        if d in dims:
            radar_dims[DIM_META[d]["label"][:14]] = dims[d]["normalized"]
    radar = _radar_svg(radar_dims)

    # Top 3 themes
    medals = ["🥇", "🥈", "🥉"]
    top3_html = ""
    for i, t in enumerate(theme_rankings[:3]):
        c = _color(t["score"])
        top3_html += f'''<div style="text-align:center;flex:1;padding:16px 10px;background:white;border-radius:14px;border:1px solid #f1f5f9;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
          <div style="font-size:24px;margin-bottom:2px;">{medals[i]}</div>
          <div style="font-size:20px;font-weight:800;color:{c};">{int(t["score"])}%</div>
          <div style="font-size:12px;font-weight:600;color:#1e293b;margin-top:2px;">{t["theme"]}</div></div>'''

    # Dimension pages
    dim_pages = ""
    page_num = 3  # after cover + exec summary
    for sec_key, sec_meta in SECTION_META.items():
        sec_dims = [d for d, m in DIM_META.items() if m["section"] == sec_key]
        for d in sec_dims:
            if d in dims:
                dim_pages += _dim_page(d, dims, sec_meta, page_num)
                page_num += 1

    # Section overview pages (after individual dims)
    sec_overviews = ""
    for sec_key, sec_meta in SECTION_META.items():
        sec_dims = [d for d, m in DIM_META.items() if m["section"] == sec_key]
        bars = ""
        sec_scores = []
        for d in sec_dims:
            if d in dims:
                bars += _bar(DIM_META[d]["label"], dims[d]["normalized"], DIM_META[d]["icon"], sec_meta["color"])
                sec_scores.append((DIM_META[d]["label"][:12], dims[d]["normalized"], _color(dims[d]["normalized"])))
        chart = _hbar(sec_scores)
        sec_overviews += f'''
        <div class="page" style="page-break-before:always;padding:28px 36px;">
          <div style="background:linear-gradient(135deg,{sec_meta["color"]}12,{sec_meta["color"]}05);padding:24px 28px;border-radius:0 0 20px 20px;margin:-28px -36px 20px;">
            <div style="display:flex;align-items:center;gap:10px;">
              <span style="font-size:28px;">{sec_meta["icon"]}</span>
              <div>
                <h2 style="font-size:20px;color:#1e293b;margin:0;">{sec_meta["label"]} — Overview</h2>
                <p style="font-size:12px;color:#64748b;margin:3px 0 0;">{sec_meta["intro"]}</p>
              </div>
            </div>
          </div>
          <div style="padding:0 12px;">
            <h3 style="font-size:14px;color:#1e293b;margin-bottom:12px;">Score Comparison</h3>
            {chart}
            <h3 style="font-size:14px;color:#1e293b;margin:20px 0 12px;">Detailed Breakdown</h3>
            {bars}
          </div>
        </div>'''

    # Themes page
    themes_html = ""
    for t in theme_rankings:
        c = _color(t["score"])
        desc = THEME_META.get(t["theme"], {}).get("desc", "")
        icon = THEME_META.get(t["theme"], {}).get("icon", "📌")
        themes_html += f'''<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;background:white;border:1px solid #f1f5f9;border-radius:12px;margin-bottom:8px;box-shadow:0 1px 3px rgba(0,0,0,0.03);">
          <div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,{c}18,{c}08);display:flex;align-items:center;justify-content:center;font-size:20px;">{icon}</div>
          <div style="flex:1;"><div style="font-weight:700;color:#1e293b;font-size:13px;">{t["theme"]}</div><div style="font-size:10px;color:#94a3b8;">{desc}</div></div>
          <div style="text-align:right;"><div style="font-size:18px;font-weight:800;color:{c};">{int(t["score"])}%</div><div style="font-size:9px;color:{c};font-weight:600;">{_level(t["score"])}</div></div></div>'''

    # Strengths
    s_items = "".join(f'<li><strong>{DIM_META[d]["label"]}</strong> — {dims[d]["normalized"]}% ({dims[d].get("level","")})</li>' for d in top_strengths[:5] if d in dims)
    g_items = "".join(f'<li><strong>{DIM_META[d]["label"]}</strong> — {dims[d]["normalized"]}% ({dims[d].get("level","")})</li>' for d in growth_areas[:5] if d in dims)
    h_items = "".join(f'<li><strong>{DIM_META[d]["label"]}</strong> — {dims[d]["normalized"]}%</li>' for d in hidden_strengths[:3] if d in dims)
    b_items = "".join(f'<li><strong>{DIM_META[d]["label"]}</strong> — {dims[d]["normalized"]}%</li>' for d in blind_spots[:3] if d in dims)

    # Learning env & motivation
    le = []
    if dims.get("visual_learning", {}).get("normalized", 0) >= 51: le.append("Visual learning (diagrams, charts, videos)")
    if dims.get("experiential_learning", {}).get("normalized", 0) >= 51: le.append("Hands-on projects and experiments")
    if dims.get("independent_learning", {}).get("normalized", 0) >= 51: le.append("Self-paced independent study")
    if dims.get("collaborative_learning", {}).get("normalized", 0) >= 51: le.append("Group discussions and peer learning")
    if dims.get("structured_vs_exploratory", {}).get("normalized", 0) >= 51: le.append("Open-ended discovery")
    if not le: le.append("Structured learning with guidance")
    le_html = "".join(f"<li>{e}</li>" for e in le)

    mo = []
    if dims.get("curiosity", {}).get("normalized", 0) >= 51: mo.append("Curiosity-driven discovery")
    if dims.get("conscientiousness", {}).get("normalized", 0) >= 51: mo.append("Achieving goals and challenges")
    if dims.get("collaboration", {}).get("normalized", 0) >= 51: mo.append("Helping others and social impact")
    if dims.get("adaptability", {}).get("normalized", 0) >= 51: mo.append("Tackling new challenges")
    if dims.get("social_energy", {}).get("normalized", 0) >= 51: mo.append("Leading teams and recognition")
    if not mo: mo.append("Personal growth")
    mo_html = "".join(f"<li>{m}</li>" for m in mo)

    a30 = "".join(f"<li>Practice {DIM_META[d]['label']} daily</li>" for d in growth_areas[:3] if d in DIM_META)
    a60 = "".join(f"<li>Leverage {DIM_META[d]['label']} in projects</li>" for d in hidden_strengths[:3] if d in DIM_META)
    a60 += "<li>Set specific learning goals for each subject</li>"
    a90 = "<li>Review progress and adjust your plan</li><li>Set long-term career goals</li><li>Begin career exploration activities</li>"

    pg = page_num + 5  # estimate remaining pages

    return f'''<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<title>VidyaLoop Report — {student_name}</title>
<style>
@page {{ size: A4; margin: 18mm 16mm; }}
* {{ margin:0; padding:0; box-sizing:border-box; }}
body {{ font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; color:#1e293b; line-height:1.55; background:#fff; }}
.page {{ page-break-after:always; }}
.page:last-child {{ page-break-after:avoid; }}
ul {{ padding-left:18px; }}
li {{ margin-bottom:5px; font-size:12.5px; line-height:1.55; color:#334155; }}
</style></head><body>

<!-- COVER -->
<div class="page" style="display:flex;flex-direction:column;justify-content:center;align-items:center;min-height:100vh;text-align:center;background:linear-gradient(160deg,#0f172a 0%,#1e3a5f 40%,#4EC0F4 100%);color:white;padding:40px;">
  <div style="margin-bottom:40px;">
    <div style="font-size:52px;font-weight:900;letter-spacing:-2px;background:linear-gradient(135deg,#fff,#4EC0F4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">VidyaLoop</div>
    <div style="font-size:14px;opacity:0.7;letter-spacing:4px;text-transform:uppercase;margin-top:4px;">Student Success Blueprint</div>
  </div>
  <div style="width:1px;height:60px;background:linear-gradient(to bottom,transparent,rgba(255,255,255,0.3),transparent);margin-bottom:40px;"></div>
  <div style="font-size:32px;font-weight:700;margin-bottom:8px;">{student_name}</div>
  <div style="font-size:16px;opacity:0.8;">Class {class_level}</div>
  <div style="font-size:15px;opacity:0.7;margin-top:4px;">{school_name}</div>
  <div style="margin-top:40px;font-size:12px;opacity:0.5;">{assessment_date}</div>
  <div style="margin-top:12px;font-size:11px;opacity:0.4;">22 Dimensions · 12 Career Themes · {pg}+ Pages</div>
</div>

<!-- EXECUTIVE SUMMARY -->
<div class="page" style="padding:28px 36px;">
  <h1 style="font-size:24px;color:#1e293b;margin-bottom:4px;">Executive Summary</h1>
  <p style="font-size:12px;color:#64748b;margin-bottom:24px;">A complete picture of who {student_name} is, how they learn, and where they're headed.</p>
  <div style="display:flex;gap:18px;justify-content:center;margin-bottom:28px;">
    {_ring(overall, 140, "Overall Score", _level(overall))}
    {_ring(frs, 140, "Future Readiness", _level(frs))}
    {_ring(fsi, 140, "Future Success", _level(fsi))}
  </div>
  <div style="background:linear-gradient(135deg,#4EC0F408,#8b5cf608);border:1px solid #e2e8f0;border-radius:14px;padding:18px;margin-bottom:20px;">
    <h3 style="font-size:13px;color:#1e293b;margin-bottom:10px;">🎯 Top 3 Career Themes</h3>
    <div style="display:flex;gap:14px;">{top3_html}</div>
  </div>
  <div style="background:#f8fafc;border-radius:14px;padding:18px;">
    <h3 style="font-size:13px;color:#1e293b;margin-bottom:10px;">🕸️ Profile Radar</h3>
    <div style="text-align:center;">{radar}</div>
  </div>
</div>

<!-- 22 DIMENSION PAGES -->
{dim_pages}

<!-- 4 SECTION OVERVIEWS -->
{sec_overviews}

<!-- 12 THEMES -->
<div class="page" style="page-break-before:always;padding:28px 36px;">
  <div style="background:linear-gradient(135deg,#f59e0b0c,#f59e0b04);padding:24px 28px;border-radius:0 0 20px 20px;margin:-28px -36px 20px;">
    <div style="display:flex;align-items:center;gap:10px;">
      <span style="font-size:28px;">🚀</span>
      <div><h2 style="font-size:20px;color:#1e293b;margin:0;">Career Discovery Blueprint</h2>
      <p style="font-size:12px;color:#64748b;margin:3px 0 0;">Your 12 career themes ranked by alignment with your profile</p></div>
    </div>
  </div>
  {themes_html}
</div>

<!-- STRENGTHS & GROWTH -->
<div class="page" style="page-break-before:always;padding:28px 36px;">
  <h2 style="font-size:20px;color:#1e293b;margin-bottom:16px;">Strengths & Growth Areas</h2>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
    <div style="background:linear-gradient(135deg,#22c55e08,#22c55e03);border:1px solid #bbf7d0;border-radius:14px;padding:16px;">
      <h3 style="font-size:13px;color:#16a34a;margin-bottom:8px;">💪 Top Strengths</h3><ul style="padding-left:14px;">{s_items}</ul></div>
    <div style="background:linear-gradient(135deg,#8b5cf608,#8b5cf603);border:1px solid #ddd6fe;border-radius:14px;padding:16px;">
      <h3 style="font-size:13px;color:#7c3aed;margin-bottom:8px;">🔮 Hidden Strengths</h3><ul style="padding-left:14px;">{h_items}</ul></div>
    <div style="background:linear-gradient(135deg,#f59e0b08,#f59e0b03);border:1px solid #fde68a;border-radius:14px;padding:16px;">
      <h3 style="font-size:13px;color:#d97706;margin-bottom:8px;">🎯 Growth Areas</h3><ul style="padding-left:14px;">{g_items}</ul></div>
    <div style="background:linear-gradient(135deg,#ef444408,#ef444403);border:1px solid #fecaca;border-radius:14px;padding:16px;">
      <h3 style="font-size:13px;color:#dc2626;margin-bottom:8px;">⚠️ Blind Spots</h3><ul style="padding-left:14px;">{b_items}</ul></div>
  </div>
</div>

<!-- LEARNING & MOTIVATION -->
<div class="page" style="page-break-before:always;padding:28px 36px;">
  <h2 style="font-size:20px;color:#1e293b;margin-bottom:16px;">How {student_name} Learns Best</h2>
  <div style="background:linear-gradient(135deg,#4EC0F408,#8b5cf608);border:1px solid #e2e8f0;border-radius:14px;padding:18px;margin-bottom:16px;">
    <h3 style="font-size:14px;color:#1e293b;margin-bottom:8px;">🏫 Ideal Learning Environment</h3>
    <ul style="padding-left:16px;">{le_html}</ul></div>
  <div style="background:linear-gradient(135deg,#f59e0b08,#f59e0b03);border:1px solid #fde68a;border-radius:14px;padding:18px;">
    <h3 style="font-size:14px;color:#1e293b;margin-bottom:8px;">🔥 What Drives {student_name}</h3>
    <ul style="padding-left:16px;">{mo_html}</ul></div>
</div>

<!-- GROWTH ROADMAP -->
<div class="page" style="page-break-before:always;padding:28px 36px;">
  <h2 style="font-size:20px;color:#1e293b;margin-bottom:16px;">Personalized Growth Roadmap</h2>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;">
    <div style="background:white;border-radius:14px;padding:18px;border:1px solid #e2e8f0;">
      <div style="font-size:12px;font-weight:700;color:#4EC0F4;margin-bottom:8px;">📅 30-Day Actions</div><ul style="padding-left:14px;">{a30}</ul></div>
    <div style="background:white;border-radius:14px;padding:18px;border:1px solid #e2e8f0;">
      <div style="font-size:12px;font-weight:700;color:#8b5cf6;margin-bottom:8px;">🎯 60-Day Goals</div><ul style="padding-left:14px;">{a60}</ul></div>
    <div style="background:white;border-radius:14px;padding:18px;border:1px solid #e2e8f0;">
      <div style="font-size:12px;font-weight:700;color:#22c55e;margin-bottom:8px;">🌟 90-Day Vision</div><ul style="padding-left:14px;">{a90}</ul></div>
  </div>
</div>

<!-- RECOMMENDATIONS -->
<div class="page" style="page-break-before:always;padding:28px 36px;">
  <h2 style="font-size:20px;color:#1e293b;margin-bottom:16px;">Recommendations</h2>
  {_text_block("For Students", [
    "Use your top strengths as a foundation for all learning and career exploration",
    "Focus on developing growth areas through consistent daily practice",
    "Explore career themes that align with your highest scores",
    "Seek experiences that match your natural learning style",
  ], "#4EC0F4")}
  {_text_block("For Parents", [
    "Support your child's learning style by providing appropriate resources",
    "Encourage exploration of interests aligned with their career themes",
    "Help build consistency in growth areas",
    "Create an environment matching their ideal learning conditions",
  ], "#8b5cf6")}
  {_text_block("For Teachers", [
    "Incorporate diverse teaching methods to match the learning style",
    "Provide opportunities for both independent and collaborative work",
    "Use strengths as entry points for new concepts",
    "Offer regular feedback aligned with growth areas",
  ], "#22c55e")}
</div>

<!-- METHODOLOGY -->
<div class="page" style="page-break-before:always;padding:28px 36px;">
  <h2 style="font-size:20px;color:#1e293b;margin-bottom:16px;">Methodology</h2>
  {_text_block("Assessment Framework", [
    "22-dimension framework covering Personality, Learning Style, Skills & Abilities, and Career Interests",
    "Validated Likert scales (self-report) and multiple-choice ability items",
    "Age-appropriate language and context for Indian K-12 students",
    "Reverse-scored questions for response validity",
  ], "#4EC0F4")}
  {_text_block("Scoring System", [
    "Likert dimensions: (raw - 6) / 24 × 100 = normalized score",
    "MC dimensions: raw / 6 × 100 = normalized score",
    "12 Career Themes: weighted combinations of relevant dimensions",
    "FRS & FSI: research-backed composite formulas",
    "All scoring is mathematical — no AI is used",
  ], "#8b5cf6")}
  <div style="text-align:center;margin-top:32px;padding:18px;background:#f8fafc;border-radius:14px;">
    <div style="font-size:22px;font-weight:800;background:linear-gradient(135deg,#4EC0F4,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">VidyaLoop</div>
    <div style="font-size:10px;color:#94a3b8;margin-top:4px;">Student Success Blueprint · {assessment_date} · {school_name}</div>
    <div style="font-size:9px;color:#cbd5e1;margin-top:6px;">Confidential — for student, parents, and school administration only.</div>
  </div>
</div>

</body></html>'''


def _generate_fallback_pdf(pdf_path, student_name, class_level, school_name, scores, assessment_date):
    from reportlab.lib import colors
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.styles import getSampleStyleSheet
    from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

    styles = getSampleStyleSheet()
    dims = scores.get("dimensions", {})
    theme_rankings = scores.get("theme_rankings", [])
    overall = scores.get("overall_score", 0)
    story = [
        Paragraph("VidyaLoop Student Success Blueprint", styles["Title"]),
        Spacer(1, 12),
        Paragraph(f"Student: {student_name}", styles["Heading2"]),
        Paragraph(f"Class {class_level} | {school_name} | {assessment_date}", styles["Normal"]),
        Spacer(1, 18),
        Paragraph(f"Overall Score: {overall}%", styles["Heading2"]),
        Paragraph(f"Future Readiness Score: {scores.get('future_readiness_score', 0)}%", styles["Normal"]),
        Paragraph(f"Future Success Index: {scores.get('future_success_index', 0)}%", styles["Normal"]),
        Spacer(1, 18),
        Paragraph("Top Career Themes", styles["Heading2"]),
    ]

    theme_rows = [["Theme", "Score"]] + [[t.get("theme", ""), f"{t.get('score', 0)}%"] for t in theme_rankings[:12]]
    table = Table(theme_rows, colWidths=[320, 100])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#4EC0F4")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#d1d5db")),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("PADDING", (0, 0), (-1, -1), 8),
    ]))
    story.extend([table, Spacer(1, 18), Paragraph("Dimension Scores", styles["Heading2"])])

    dim_rows = [["Dimension", "Score", "Level"]]
    for key, value in dims.items():
        label = DIM_META.get(key, {}).get("label", key.replace("_", " ").title())
        dim_rows.append([label, f"{value.get('normalized', 0)}%", value.get("level", "")])
    dim_table = Table(dim_rows, colWidths=[260, 80, 100])
    dim_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#111827")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#d1d5db")),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("PADDING", (0, 0), (-1, -1), 6),
    ]))
    story.append(dim_table)
    doc = SimpleDocTemplate(pdf_path, pagesize=A4, rightMargin=36, leftMargin=36, topMargin=36, bottomMargin=36)
    doc.build(story)

async def generate_report(assessment_id, student_id, school_id, student_name, class_level, school_name, scores):
    dims = scores.get("dimensions", {})
    if dims:
        all_norms = [v.get("normalized", 0) for v in dims.values()]
        if all_norms:
            scores["overall_score"] = round(sum(all_norms) / len(all_norms), 1)

    assessment_date = datetime.now(timezone.utc).strftime("%B %d, %Y")
    html = _generate_html(student_name, class_level, school_name, scores, assessment_date)

    report_id = f"report_{uuid.uuid4().hex[:12]}"
    report_doc = {
        "_id": report_id, "assessment_id": assessment_id, "student_id": student_id,
        "school_id": school_id, "report_type": "comprehensive",
        "html_content": html,
        "page_count": 30,
        "file_size": len(html.encode("utf-8")),
        "generated_at": datetime.now(timezone.utc).isoformat(), "status": "ready", "scores": scores,
    }
    await reports_collection.insert_one(report_doc)
    return report_doc


