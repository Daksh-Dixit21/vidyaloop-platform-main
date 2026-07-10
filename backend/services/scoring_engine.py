from typing import Dict, Any, List


LIKERT_MAP = {
    "1": 1, "2": 2, "3": 3, "4": 4, "5": 5,
    "strongly_disagree": 1, "disagree": 2, "neutral": 3, "agree": 4, "strongly_agree": 5,
}


def normalize_likert(raw_score: float) -> float:
    """Convert Likert raw (6-30) to normalized 0-100."""
    return round(((raw_score - 6) / 24) * 100, 1) if raw_score >= 6 else 0.0


def normalize_mc(raw_score: float) -> float:
    """Convert MC raw (0-6) to normalized 0-100."""
    return round((raw_score / 6) * 100, 1) if raw_score > 0 else 0.0


def get_level(normalized: float) -> str:
    if normalized >= 76:
        return "Exceptional"
    elif normalized >= 51:
        return "Proficient"
    elif normalized >= 26:
        return "Developing"
    else:
        return "Needs Support"


def get_interpretation(dimension: str, normalized: float) -> str:
    level = get_level(normalized)
    interps = {
        "social_energy": {
            "Exceptional": "You are highly energized by social interactions and naturally engage with others. Your social confidence is a major asset.",
            "Proficient": "You are comfortable in social settings and can engage effectively with peers and adults.",
            "Developing": "You are developing your social energy. You may prefer smaller groups or need time to warm up.",
            "Needs Support": "You tend to be more reserved in social situations. Building social confidence can help in collaborative environments.",
        },
        "conscientiousness": {
            "Exceptional": "You demonstrate outstanding self-discipline, organization, and reliability. This is a core strength.",
            "Proficient": "You are organized and dependable, completing tasks with care and attention to detail.",
            "Developing": "You are building your organizational skills. Developing consistent habits will accelerate growth.",
            "Needs Support": "You may struggle with organization and time management. Structured routines and reminders can help.",
        },
        "curiosity": {
            "Exceptional": "You have a powerful drive to explore, question, and understand the world around you.",
            "Proficient": "You are naturally curious and enjoy exploring new ideas and topics.",
            "Developing": "Your curiosity is emerging. Exposure to diverse topics can help spark deeper interest.",
            "Needs Support": "You may prefer familiar topics over new ones. Gentle encouragement to explore can help.",
        },
        "collaboration": {
            "Exceptional": "You demonstrate outstanding empathy and team skills. You naturally support and understand others.",
            "Proficient": "You work well with others and show genuine care for your peers.",
            "Developing": "You are building your collaboration skills. Practice active listening and teamwork.",
            "Needs Support": "You may prefer working alone. Building empathy and communication skills can help.",
        },
        "adaptability": {
            "Exceptional": "You thrive in changing environments and recover quickly from setbacks. This is a powerful strength.",
            "Proficient": "You handle change well and can adjust your approach when needed.",
            "Developing": "You are developing your adaptability. Practice embracing change as an opportunity.",
            "Needs Support": "You may find change uncomfortable. Building resilience through small challenges can help.",
        },
        "visual_learning": {
            "Exceptional": "You learn most effectively through visual information. Diagrams, charts, and videos are powerful tools for you.",
            "Proficient": "You benefit from visual learning materials and can process visual information effectively.",
            "Developing": "You have some preference for visual learning. Combining visual and verbal methods may work best.",
            "Needs Support": "You may prefer verbal or hands-on learning. Visual aids can still supplement your learning.",
        },
        "experiential_learning": {
            "Exceptional": "You learn best through direct experience and hands-on application. Practical projects are your strength.",
            "Proficient": "You benefit from practical learning and can apply concepts effectively through experience.",
            "Developing": "You are developing your preference for experiential learning. Mix theory with practice.",
            "Needs Support": "You may prefer learning through explanations. Gradual exposure to hands-on activities can help.",
        },
        "independent_learning": {
            "Exceptional": "You are a highly self-directed learner who takes ownership of your growth. This is a major advantage.",
            "Proficient": "You can learn independently and take responsibility for your learning goals.",
            "Developing": "You are building independence. Setting small personal goals can help.",
            "Needs Support": "You may benefit from more guidance and structure. Building self-direction gradually is recommended.",
        },
        "collaborative_learning": {
            "Exceptional": "You learn powerfully through discussion and teamwork. Peer interaction deepens your understanding.",
            "Proficient": "You benefit from group learning and can contribute effectively to team discussions.",
            "Developing": "You are developing your collaborative learning skills. Try participating more in group activities.",
            "Needs Support": "You may prefer individual learning. Gradual exposure to group work can help.",
        },
        "structured_vs_exploratory": {
            "Exceptional": "You thrive in exploratory environments with freedom to discover and experiment.",
            "Proficient": "You can work effectively in both structured and exploratory settings.",
            "Developing": "You are developing flexibility in learning approaches. Try mixing structured and open-ended tasks.",
            "Needs Support": "You strongly prefer structured learning. Developing comfort with ambiguity can help.",
        },
        "verbal_ability": {
            "Exceptional": "You demonstrate strong verbal reasoning and communication skills. Language is a natural strength.",
            "Proficient": "You handle communication and comprehension tasks effectively.",
            "Developing": "Your verbal skills are developing. Regular reading and writing practice will help.",
            "Needs Support": "You may benefit from additional language support. Focus on reading and vocabulary building.",
        },
        "numerical_ability": {
            "Exceptional": "You demonstrate strong quantitative reasoning. Math and data analysis are natural strengths.",
            "Proficient": "You handle numerical tasks with confidence and accuracy.",
            "Developing": "Your numerical skills are developing. Regular practice with math problems will help.",
            "Needs Support": "You may benefit from additional math support. Focus on fundamental concepts.",
        },
        "logical_reasoning": {
            "Exceptional": "You demonstrate outstanding logical and analytical thinking. Problem-solving is a core strength.",
            "Proficient": "You can analyze problems logically and find effective solutions.",
            "Developing": "Your logical reasoning is developing. Practice puzzles and analytical thinking.",
            "Needs Support": "You may benefit from structured problem-solving exercises. Focus on step-by-step reasoning.",
        },
        "creative_thinking": {
            "Exceptional": "You are highly creative and generate original ideas effortlessly. Innovation is your strength.",
            "Proficient": "You can think creatively and come up with original solutions.",
            "Developing": "Your creative thinking is developing. Explore diverse activities to spark creativity.",
            "Needs Support": "You may prefer following established methods. Try exploring new approaches gradually.",
        },
        "spatial_ability": {
            "Exceptional": "You have exceptional spatial reasoning. Visualizing shapes, patterns, and 3D objects is a strength.",
            "Proficient": "You can visualize and manipulate spatial information effectively.",
            "Developing": "Your spatial skills are developing. Practice with puzzles and visual activities.",
            "Needs Support": "You may benefit from spatial reasoning exercises. Focus on visualization techniques.",
        },
        "leadership_potential": {
            "Exceptional": "You demonstrate outstanding leadership qualities. You naturally guide and inspire others.",
            "Proficient": "You can take initiative and guide others effectively when needed.",
            "Developing": "Your leadership skills are emerging. Practice taking initiative in small group settings.",
            "Needs Support": "You may prefer following others. Building confidence to take the lead gradually is recommended.",
        },
        "investigative_interest": {
            "Exceptional": "You have a strong passion for research, analysis, and scientific inquiry.",
            "Proficient": "You enjoy analytical and research-oriented activities.",
            "Developing": "Your investigative interest is emerging. Explore science and research activities.",
            "Needs Support": "You may prefer other types of activities. Gentle exposure to analytical tasks can help.",
        },
        "artistic_interest": {
            "Exceptional": "You have a deep passion for creative expression and artistic endeavors.",
            "Proficient": "You enjoy creative activities and appreciate artistic expression.",
            "Developing": "Your artistic interest is developing. Explore various creative activities.",
            "Needs Support": "You may prefer practical over artistic activities. Exposure to art forms can help.",
        },
        "social_interest": {
            "Exceptional": "You have a strong desire to help, teach, and support others. Service is a core value.",
            "Proficient": "You enjoy helping others and are drawn to service-oriented activities.",
            "Developing": "Your social interest is developing. Volunteer and community activities can help.",
            "Needs Support": "You may prefer tasks over people-oriented roles. Gradual exposure to service can help.",
        },
        "enterprising_interest": {
            "Exceptional": "You have a strong drive to lead, organize, and create impact through enterprise.",
            "Proficient": "You enjoy leadership roles and organizing people toward goals.",
            "Developing": "Your enterprising interest is developing. Try taking on small leadership roles.",
            "Needs Support": "You may prefer following rather than leading. Building confidence gradually is recommended.",
        },
        "conventional_interest": {
            "Exceptional": "You excel in organized, detail-oriented work and systematic approaches.",
            "Proficient": "You enjoy structured tasks and work well with data and procedures.",
            "Developing": "Your conventional interest is developing. Practice organizational skills.",
            "Needs Support": "You may prefer unpredictable work. Building comfort with structure can help.",
        },
        "realistic_interest": {
            "Exceptional": "You have a strong hands-on aptitude and enjoy practical, tangible work.",
            "Proficient": "You enjoy working with tools, machines, and physical objects.",
            "Developing": "Your realistic interest is developing. Explore hands-on activities and projects.",
            "Needs Support": "You may prefer theoretical over practical work. Gradual exposure to hands-on tasks can help.",
        },
    }
    dim_interps = interps.get(dimension, {})
    return dim_interps.get(level, f"You demonstrate a {level.lower()} level in this area.")


# ─── THEME FORMULAS (12 themes) ────────────────────────────────────────────

THEME_FORMULAS = {
    "Researcher": {
        "description": "Curiosity, investigation, knowledge, discovery",
        "weights": {
            "investigative_interest": 0.30,
            "curiosity": 0.25,
            "logical_reasoning": 0.20,
            "independent_learning": 0.10,
            "structured_vs_exploratory": 0.10,
            "verbal_ability": 0.05,
        },
    },
    "Innovator": {
        "description": "Creativity, experimentation, new ideas",
        "weights": {
            "creative_thinking": 0.25,
            "curiosity": 0.20,
            "artistic_interest": 0.20,
            "logical_reasoning": 0.15,
            "structured_vs_exploratory": 0.10,
            "adaptability": 0.05,
            "investigative_interest": 0.05,
        },
    },
    "Creator": {
        "description": "Expression, design, imagination, originality",
        "weights": {
            "artistic_interest": 0.30,
            "creative_thinking": 0.25,
            "visual_learning": 0.15,
            "verbal_ability": 0.10,
            "curiosity": 0.10,
            "structured_vs_exploratory": 0.10,
        },
    },
    "Builder": {
        "description": "Hands-on creation, implementation, practical problem-solving",
        "weights": {
            "realistic_interest": 0.30,
            "logical_reasoning": 0.20,
            "experiential_learning": 0.15,
            "spatial_ability": 0.15,
            "conscientiousness": 0.10,
            "structured_vs_exploratory": 0.05,
            "adaptability": 0.05,
        },
    },
    "Strategist": {
        "description": "Planning, systems thinking, long-term thinking",
        "weights": {
            "logical_reasoning": 0.25,
            "conventional_interest": 0.20,
            "numerical_ability": 0.15,
            "enterprising_interest": 0.15,
            "structured_vs_exploratory": 0.10,
            "conscientiousness": 0.10,
            "independent_learning": 0.05,
        },
    },
    "Leader": {
        "description": "Influence, initiative, responsibility",
        "weights": {
            "enterprising_interest": 0.25,
            "social_energy": 0.20,
            "social_interest": 0.15,
            "verbal_ability": 0.15,
            "conscientiousness": 0.10,
            "collaborative_learning": 0.10,
            "logical_reasoning": 0.05,
        },
    },
    "Educator": {
        "description": "Teaching, helping, mentoring, developing others",
        "weights": {
            "social_interest": 0.30,
            "verbal_ability": 0.20,
            "collaborative_learning": 0.15,
            "social_energy": 0.15,
            "curiosity": 0.10,
            "investigative_interest": 0.05,
            "logical_reasoning": 0.05,
        },
    },
    "Entrepreneur": {
        "description": "Opportunity creation, ownership, growth",
        "weights": {
            "enterprising_interest": 0.25,
            "logical_reasoning": 0.20,
            "creative_thinking": 0.15,
            "adaptability": 0.15,
            "conscientiousness": 0.10,
            "independent_learning": 0.05,
            "structured_vs_exploratory": 0.05,
            "artistic_interest": 0.05,
        },
    },
    "Problem Solver": {
        "description": "Analysis, solutions, critical thinking",
        "weights": {
            "logical_reasoning": 0.50,
            "investigative_interest": 0.15,
            "curiosity": 0.15,
            "conscientiousness": 0.10,
            "experiential_learning": 0.05,
            "realistic_interest": 0.05,
        },
    },
    "Communicator": {
        "description": "Expression, persuasion, connection",
        "weights": {
            "verbal_ability": 0.40,
            "social_interest": 0.20,
            "social_energy": 0.15,
            "collaborative_learning": 0.10,
            "enterprising_interest": 0.10,
            "creative_thinking": 0.05,
        },
    },
    "Analyst": {
        "description": "Data, logic, evidence, objective thinking",
        "weights": {
            "logical_reasoning": 0.30,
            "investigative_interest": 0.20,
            "numerical_ability": 0.20,
            "curiosity": 0.10,
            "structured_vs_exploratory": 0.10,
            "independent_learning": 0.05,
            "conventional_interest": 0.05,
        },
    },
    "Change Maker": {
        "description": "Impact, improvement, contribution, social influence",
        "weights": {
            "social_interest": 0.25,
            "logical_reasoning": 0.20,
            "creative_thinking": 0.15,
            "enterprising_interest": 0.15,
            "curiosity": 0.10,
            "adaptability": 0.05,
            "collaborative_learning": 0.05,
            "structured_vs_exploratory": 0.05,
        },
    },
}


# ─── FUTURE READINESS SCORE ────────────────────────────────────────────────

FRS_WEIGHTS = {
    "adaptability": 0.25,
    "curiosity": 0.20,
    "conscientiousness": 0.15,
    "independent_learning": 0.15,
    "logical_reasoning": 0.10,
    "_top3_themes_avg": 0.15,
}


# ─── FUTURE SUCCESS INDEX ──────────────────────────────────────────────────

FSI_WEIGHTS = {
    "conscientiousness": 0.25,
    "_top3_themes_avg": 0.25,
    "adaptability": 0.20,
    "collaboration": 0.15,
    "curiosity": 0.15,
}


# ─── MAIN SCORING ──────────────────────────────────────────────────────────

def calculate_all_scores(answers: Dict[str, Any], questions: List[Dict]) -> Dict[str, Any]:
    dim_scores = {}
    dims = list(set(q["dimension"] for q in questions))
    for dim in dims:
        dim_qs = [q for q in questions if q["dimension"] == dim]
        raw = 0.0
        max_raw = 0.0
        for q in dim_qs:
            q_id = q["_id"]
            ans = answers.get(q_id)
            max_raw += 5.0
            if ans is None:
                continue
            if q["question_type"] == "multiple_choice":
                if ans == q.get("correct_answer"):
                    raw += 1.0
            else:
                score = int(LIKERT_MAP.get(str(ans).lower(), 3))
                if q.get("reverse_scored"):
                    score = 6 - score
                raw += float(score)
        if q["question_type"] == "multiple_choice":
            norm = normalize_mc(raw)
        else:
            norm = normalize_likert(raw)
        dim_scores[dim] = {
            "raw_score": round(raw, 2),
            "normalized": norm,
            "level": get_level(norm),
            "interpretation": get_interpretation(dim, norm),
        }

    theme_scores = {}
    for theme_name, formula in THEME_FORMULAS.items():
        score = 0.0
        for dim_name, weight in formula["weights"].items():
            if dim_name in dim_scores:
                score += dim_scores[dim_name]["normalized"] * weight
        theme_scores[theme_name] = {
            "score": round(score, 1),
            "level": get_level(score),
            "description": formula["description"],
        }

    sorted_themes = sorted(theme_scores.items(), key=lambda x: x[1]["score"], reverse=True)
    top3_avg = sum(t[1]["score"] for t in sorted_themes[:3]) / 3 if sorted_themes else 0

    frs = 0.0
    for dim_name, weight in FRS_WEIGHTS.items():
        if dim_name == "_top3_themes_avg":
            frs += top3_avg * weight
        elif dim_name in dim_scores:
            frs += dim_scores[dim_name]["normalized"] * weight
    frs = round(frs, 1)

    fsi = 0.0
    for dim_name, weight in FSI_WEIGHTS.items():
        if dim_name == "_top3_themes_avg":
            fsi += top3_avg * weight
        elif dim_name in dim_scores:
            fsi += dim_scores[dim_name]["normalized"] * weight
    fsi = round(fsi, 1)

    sorted_dims = sorted(dim_scores.items(), key=lambda x: x[1]["normalized"], reverse=True)
    top_strengths = [d[0] for d in sorted_dims[:5]]
    growth_areas = [d[0] for d in sorted_dims[-5:]]
    hidden_strengths = [d[0] for d in sorted_dims[5:10]]
    blind_spots = [d[0] for d in sorted_dims[-10:-5]]

    return {
        "dimensions": dim_scores,
        "themes": theme_scores,
        "theme_rankings": [{"theme": t[0], "score": t[1]["score"], "level": t[1]["level"]} for t in sorted_themes],
        "top3_themes_avg": round(top3_avg, 1),
        "future_readiness_score": frs,
        "future_success_index": fsi,
        "top_strengths": top_strengths,
        "growth_areas": growth_areas,
        "hidden_strengths": hidden_strengths,
        "blind_spots": blind_spots,
    }
