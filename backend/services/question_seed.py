import uuid
from database import question_banks_collection


SECTIONS = {
    "personality": {
        "name": "Personality Profile",
        "description": "Understand your core personality traits, social energy, discipline, curiosity, empathy, and resilience.",
        "dimensions": ["social_energy", "conscientiousness", "curiosity", "collaboration", "adaptability"],
        "time_limit_minutes": 10,
    },
    "learning_style": {
        "name": "Learning Style Profile",
        "description": "Discover how you learn best - visually, practically, independently, collaboratively, or through structure vs exploration.",
        "dimensions": ["visual_learning", "experiential_learning", "independent_learning", "collaborative_learning", "structured_vs_exploratory"],
        "time_limit_minutes": 10,
    },
    "skills_abilities": {
        "name": "Skills & Abilities Profile",
        "description": "Measure your verbal, numerical, logical, creative, spatial abilities and leadership potential.",
        "dimensions": ["verbal_ability", "numerical_ability", "logical_reasoning", "creative_thinking", "spatial_ability", "leadership_potential"],
        "time_limit_minutes": 20,
    },
    "career_interests": {
        "name": "Career Interest Profile",
        "description": "Explore your career interests across investigative, artistic, social, enterprising, conventional, and realistic domains.",
        "dimensions": ["investigative_interest", "artistic_interest", "social_interest", "enterprising_interest", "conventional_interest", "realistic_interest"],
        "time_limit_minutes": 10,
    },
}

LIKERT_OPTIONS = [
    {"id": "1", "text": "Strongly Disagree", "value": 1},
    {"id": "2", "text": "Disagree", "value": 2},
    {"id": "3", "text": "Neutral", "value": 3},
    {"id": "4", "text": "Agree", "value": 4},
    {"id": "5", "text": "Strongly Agree", "value": 5},
]


def _likert_q(dim, text, reverse=False):
    return {
        "_id": f"q_{uuid.uuid4().hex[:10]}",
        "section": None,
        "dimension": dim,
        "text": text,
        "question_type": "likert_5",
        "options": LIKERT_OPTIONS,
        "reverse_scored": reverse,
        "weight": 1.0,
    }


def _mc_q(dim, text, options, correct_id):
    return {
        "_id": f"q_{uuid.uuid4().hex[:10]}",
        "section": None,
        "dimension": dim,
        "text": text,
        "question_type": "multiple_choice",
        "options": options,
        "correct_answer": correct_id,
        "reverse_scored": False,
        "weight": 1.0,
    }


def _mc_opts(a, b, c, d):
    return [
        {"id": "a", "text": a, "value": 0},
        {"id": "b", "text": b, "value": 0},
        {"id": "c", "text": c, "value": 0},
        {"id": "d", "text": d, "value": 0},
    ]


# ─── SECTION 1: PERSONALITY PROFILE ───────────────────────────────────────

def _personality_questions():
    qs = []
    section = "personality"

    # DIMENSION 1: Social Energy (6 questions)
    social_energy_qs = [
        ("I feel energized after spending time in large groups.", False),
        ("I enjoy meeting new people and starting conversations.", False),
        ("I prefer working in teams rather than alone.", False),
        ("I feel comfortable speaking up in class or meetings.", False),
        ("I tend to stay quiet and reserved in social settings.", True),
        ("I recharge my energy by spending time alone.", True),
    ]
    for text, rev in social_energy_qs:
        q = _likert_q("social_energy", text, rev)
        q["section"] = section
        qs.append(q)

    # DIMENSION 2: Conscientiousness & Discipline (6 questions)
    conscientiousness_qs = [
        ("I always complete my work on time.", False),
        ("I keep my study area organized and tidy.", False),
        ("I follow a regular study schedule.", False),
        ("I pay attention to details in my work.", False),
        ("I often leave things until the last minute.", True),
        ("I find it hard to stay focused on tasks for long periods.", True),
    ]
    for text, rev in conscientiousness_qs:
        q = _likert_q("conscientiousness", text, rev)
        q["section"] = section
        qs.append(q)

    # DIMENSION 3: Curiosity & Openness (6 questions)
    curiosity_qs = [
        ("I enjoy learning about new and different topics.", False),
        ("I ask questions to understand things better.", False),
        ("I like exploring ideas that are different from my own.", False),
        ("I enjoy reading or watching things that challenge my thinking.", False),
        ("I prefer sticking to what I already know.", True),
        ("I rarely explore topics outside my usual interests.", True),
    ]
    for text, rev in curiosity_qs:
        q = _likert_q("curiosity", text, rev)
        q["section"] = section
        qs.append(q)

    # DIMENSION 4: Collaboration & Empathy (6 questions)
    collaboration_qs = [
        ("I understand how my classmates feel even when they don't say it.", False),
        ("I enjoy working on group projects.", False),
        ("I listen carefully to others' opinions before sharing mine.", False),
        ("I try to help classmates who are struggling.", False),
        ("I find it hard to see things from another person's perspective.", True),
        ("I prefer working alone because I don't trust others to do their part.", True),
    ]
    for text, rev in collaboration_qs:
        q = _likert_q("collaboration", text, rev)
        q["section"] = section
        qs.append(q)

    # DIMENSION 5: Adaptability & Resilience (6 questions)
    adaptability_qs = [
        ("I adjust quickly when plans change unexpectedly.", False),
        ("I recover quickly from setbacks or failures.", False),
        ("I see mistakes as opportunities to learn and improve.", False),
        ("I remain calm and focused under pressure.", False),
        ("I feel frustrated and give up when things don't go as planned.", True),
        ("I struggle to adapt to new or unfamiliar situations.", True),
    ]
    for text, rev in adaptability_qs:
        q = _likert_q("adaptability", text, rev)
        q["section"] = section
        qs.append(q)

    return qs


# ─── SECTION 2: LEARNING STYLE PROFILE ────────────────────────────────────

def _learning_style_questions():
    qs = []
    section = "learning_style"

    # DIMENSION 1: Visual Learning Preference (6 questions, Q5+Q6 reverse)
    visual_qs = [
        ("I understand new concepts more easily when I see diagrams, charts, or visual examples.", False),
        ("I remember information better when it is presented visually.", False),
        ("I prefer watching a demonstration rather than only reading instructions.", False),
        ("Visual aids such as mind maps, flowcharts, or illustrations help me learn effectively.", False),
        ("I usually learn best through written explanations without needing visual support.", True),
        ("Pictures, diagrams, and visual examples rarely improve my understanding of a topic.", True),
    ]
    for text, rev in visual_qs:
        q = _likert_q("visual_learning", text, rev)
        q["section"] = section
        qs.append(q)

    # DIMENSION 2: Practical & Experiential Learning (6 questions, Q5+Q6 reverse)
    experiential_qs = [
        ("I understand concepts better when I can apply them in a real-world situation.", False),
        ("I learn more effectively through projects, activities, or experiments than through reading alone.", False),
        ("I prefer trying something myself rather than only watching or hearing about it.", False),
        ("Hands-on experiences help me remember information better.", False),
        ("I am comfortable learning a topic without needing to apply it practically.", True),
        ("I prefer learning through explanations rather than through activities or experiments.", True),
    ]
    for text, rev in experiential_qs:
        q = _likert_q("experiential_learning", text, rev)
        q["section"] = section
        qs.append(q)

    # DIMENSION 3: Independent Learning (6 questions, Q5+Q6 reverse)
    independent_qs = [
        ("I enjoy learning new things on my own without needing constant guidance.", False),
        ("When I encounter a problem, I usually try to solve it myself before asking for help.", False),
        ("I take responsibility for keeping myself on track with my learning goals.", False),
        ("I enjoy exploring topics beyond what is required in class or training.", False),
        ("I prefer having someone guide me through every step of the learning process.", True),
        ("I find it difficult to stay motivated when learning independently.", True),
    ]
    for text, rev in independent_qs:
        q = _likert_q("independent_learning", text, rev)
        q["section"] = section
        qs.append(q)

    # DIMENSION 4: Collaborative Learning (6 questions, Q5+Q6 reverse)
    collab_learn_qs = [
        ("I learn better when I can discuss ideas with others.", False),
        ("Group activities help me understand concepts more effectively.", False),
        ("I enjoy hearing different perspectives while learning.", False),
        ("I learn useful things from classmates, peers, or teammates.", False),
        ("I prefer learning entirely on my own rather than working with others.", True),
        ("Group discussions rarely improve my understanding of a topic.", True),
    ]
    for text, rev in collab_learn_qs:
        q = _likert_q("collaborative_learning", text, rev)
        q["section"] = section
        qs.append(q)

    # DIMENSION 5: Structured vs Exploratory Learning (6 questions, Q1+Q5 reverse)
    structured_qs = [
        ("I prefer having clear instructions before starting a new task.", True),
        ("I enjoy exploring different ways of solving a problem.", False),
        ("I feel comfortable learning without knowing exactly what the outcome will be.", False),
        ("I enjoy open-ended projects where I can decide my own approach.", False),
        ("I prefer step-by-step guidance rather than figuring things out myself.", True),
        ("I enjoy experimenting and discovering solutions through exploration.", False),
    ]
    for text, rev in structured_qs:
        q = _likert_q("structured_vs_exploratory", text, rev)
        q["section"] = section
        qs.append(q)

    return qs


# ─── SECTION 3: SKILLS & ABILITIES PROFILE ─────────────────────────────────

def _skills_abilities_questions():
    qs = []
    section = "skills_abilities"

    # DIMENSION 1: Verbal Ability (6 MC questions, answer key from reference)
    verbal_qs = [
        ("Choose the word closest in meaning to 'CANDID'.",
         _mc_opts("Dishonest", "Frank", "Cautious", "Reserved"), "b"),
        ("Choose the word most opposite in meaning to 'METICULOUS'.",
         _mc_opts("Careless", "Thorough", "Precise", "Detailed"), "a"),
        ("AUTHOR is to BOOK as DIRECTOR is to ______.",
         _mc_opts("Camera", "Film", "Actor", "Theatre"), "b"),
        ("Despite the heavy rain, the players were ______ to finish the match before the deadline.",
         _mc_opts("reluctant", "determined", "indifferent", "hesitant"), "b"),
        ("Read: 'Most students assume that revising right before an exam is the most effective way to remember information. However, research on memory shows that spacing out revision over several days, with short breaks in between, helps information move into long-term memory far more effectively than last-minute cramming.'\n\nAccording to the passage, what is the most effective way to retain information?",
         _mc_opts("Studying continuously the night before", "Reading the material only once", "Spacing revision over several days", "Avoiding breaks while studying"), "c"),
        ("Read: 'Many companies now allow employees to choose their own working hours, as long as they complete their tasks on time. While this increases flexibility, some employees report feeling more isolated, since they overlap with colleagues' schedules less often.'\n\nWhat is one drawback of flexible working hours mentioned?",
         _mc_opts("Reduced productivity", "Increased isolation", "Lower task completion", "Less flexibility"), "b"),
    ]
    for text, opts, correct in verbal_qs:
        q = _mc_q("verbal_ability", text, opts, correct)
        q["section"] = section
        qs.append(q)

    # DIMENSION 2: Numerical Ability (6 MC questions)
    numerical_qs = [
        ("What number comes next in the series: 4, 9, 16, 25, 36, ?",
         _mc_opts("42", "45", "49", "47"), "c"),
        ("A shirt costs Rs.450 after a 10% discount. What was the original price?",
         _mc_opts("Rs.400", "Rs.495", "Rs.500", "Rs.550"), "c"),
        ("If 5 machines produce 5 widgets in 5 minutes, how long would 100 machines take to make 100 widgets?",
         _mc_opts("100 minutes", "5 minutes", "20 minutes", "50 minutes"), "b"),
        ("What is 0.25 expressed as a fraction?",
         _mc_opts("1/2", "1/4", "1/3", "2/5"), "b"),
        ("A train travels 360 km in 4 hours. What is its average speed?",
         _mc_opts("80 km/h", "90 km/h", "100 km/h", "70 km/h"), "b"),
        ("If the area of a square is 64 sq cm, what is its perimeter?",
         _mc_opts("16 cm", "24 cm", "32 cm", "64 cm"), "c"),
    ]
    for text, opts, correct in numerical_qs:
        q = _mc_q("numerical_ability", text, opts, correct)
        q["section"] = section
        qs.append(q)

    # DIMENSION 3: Logical Reasoning (6 MC questions)
    logical_qs = [
        ("If all roses are flowers, and some flowers fade quickly, can we say all roses fade quickly?",
         _mc_opts("Yes", "No", "Maybe", "Not enough info"), "b"),
        ("A is taller than B. B is taller than C. Who is the shortest?",
         _mc_opts("A", "B", "C", "Cannot tell"), "c"),
        ("If today is Monday, what day is it 100 days from now?",
         _mc_opts("Monday", "Tuesday", "Wednesday", "Sunday"), "b"),
        ("Which number does not belong: 2, 3, 5, 7, 9, 11?",
         _mc_opts("2", "7", "9", "11"), "c"),
        ("Find the odd one out: Apple, Mango, Potato, Banana",
         _mc_opts("Apple", "Potato", "Mango", "Banana"), "b"),
        ("Which comes next in the pattern: O, T, T, F, F, S, S, ?",
         _mc_opts("E", "N", "T", "D"), "b"),
    ]
    for text, opts, correct in logical_qs:
        q = _mc_q("logical_reasoning", text, opts, correct)
        q["section"] = section
        qs.append(q)

    # DIMENSION 4: Creative Thinking (6 Likert questions)
    creative_qs = [
        ("I enjoy coming up with original ideas and solutions.", False),
        ("I like to think of unique ways to solve problems.", False),
        ("I often come up with ideas that others haven't thought of.", False),
        ("I enjoy creating something new from different materials or concepts.", False),
        ("I prefer following established methods rather than trying new approaches.", True),
        ("I find it difficult to think of creative solutions to problems.", True),
    ]
    for text, rev in creative_qs:
        q = _likert_q("creative_thinking", text, rev)
        q["section"] = section
        qs.append(q)

    # DIMENSION 5: Spatial & Visual Reasoning (6 MC questions)
    spatial_qs = [
        ("If you fold a square piece of paper in half twice and cut a corner, how many holes when unfolded?",
         _mc_opts("1", "2", "4", "8"), "c"),
        ("If you look at a clock in a mirror and it shows 3:00, what time is it actually?",
         _mc_opts("3:00", "9:00", "6:00", "12:00"), "b"),
        ("How many squares are on a standard chess board (8x8)?",
         _mc_opts("64", "204", "100", "32"), "b"),
        ("A block is 3cm x 4cm x 5cm. What is its volume?",
         _mc_opts("12 cubic cm", "60 cubic cm", "15 cubic cm", "47 cubic cm"), "b"),
        ("If you rotate the letter 'd' 180 degrees, what letter does it become?",
         _mc_opts("b", "p", "q", "d"), "b"),
        ("How many lines of symmetry does a regular hexagon have?",
         _mc_opts("2", "4", "6", "8"), "c"),
    ]
    for text, opts, correct in spatial_qs:
        q = _mc_q("spatial_ability", text, opts, correct)
        q["section"] = section
        qs.append(q)

    # DIMENSION 6: Leadership Potential (6 Likert questions)
    leadership_qs = [
        ("I naturally take charge when a group needs direction.", False),
        ("I feel responsible for making sure my team succeeds.", False),
        ("I am comfortable making decisions that affect others.", False),
        ("I motivate my classmates or teammates to work toward a goal.", False),
        ("I prefer to follow instructions rather than take the lead.", True),
        ("I avoid situations where I have to make decisions for a group.", True),
    ]
    for text, rev in leadership_qs:
        q = _likert_q("leadership_potential", text, rev)
        q["section"] = section
        qs.append(q)

    return qs


# ─── SECTION 4: CAREER INTEREST PROFILE ────────────────────────────────────

def _career_interest_questions():
    qs = []
    section = "career_interests"

    # DIMENSION 1: Investigative Interest (6 questions)
    investigative_qs = [
        ("I enjoy solving complex problems and puzzles.", False),
        ("I like understanding how things work through research and analysis.", False),
        ("I enjoy conducting experiments or investigating scientific questions.", False),
        ("I prefer tasks that require logical thinking over creative expression.", False),
        ("I enjoy analyzing data and finding patterns.", False),
        ("I rarely spend time exploring scientific or technical topics.", True),
    ]
    for text, rev in investigative_qs:
        q = _likert_q("investigative_interest", text, rev)
        q["section"] = section
        qs.append(q)

    # DIMENSION 2: Artistic Interest (6 questions)
    artistic_qs = [
        ("I enjoy expressing myself through art, music, writing, or design.", False),
        ("I appreciate beauty in nature, art, and everyday life.", False),
        ("I like creating original works such as paintings, stories, or music.", False),
        ("I prefer tasks that allow for creativity and self-expression.", False),
        ("I find artistic activities boring and a waste of time.", True),
        ("I rarely engage in creative or artistic activities.", True),
    ]
    for text, rev in artistic_qs:
        q = _likert_q("artistic_interest", text, rev)
        q["section"] = section
        qs.append(q)

    # DIMENSION 3: Social Interest (6 questions)
    social_interest_qs = [
        ("I enjoy helping others solve their problems.", False),
        ("I feel satisfied when I can make a difference in someone's life.", False),
        ("I like working in roles where I can teach, counsel, or support others.", False),
        ("I am drawn to careers that involve community service or social impact.", False),
        ("I prefer tasks that involve working with people over working with machines or data.", False),
        ("I rarely think about how I can help or serve others.", True),
    ]
    for text, rev in social_interest_qs:
        q = _likert_q("social_interest", text, rev)
        q["section"] = section
        qs.append(q)

    # DIMENSION 4: Enterprising Interest (6 questions)
    enterprising_qs = [
        ("I enjoy leading projects and organizing people toward a goal.", False),
        ("I like persuading others to support my ideas or initiatives.", False),
        ("I am interested in starting my own business or organization someday.", False),
        ("I enjoy taking on responsibility and making important decisions.", False),
        ("I prefer tasks that involve managing and motivating others.", False),
        ("I feel uncomfortable being in a leadership or decision-making role.", True),
    ]
    for text, rev in enterprising_qs:
        q = _likert_q("enterprising_interest", text, rev)
        q["section"] = section
        qs.append(q)

    # DIMENSION 5: Conventional Interest (6 questions)
    conventional_qs = [
        ("I enjoy organizing data, files, and records in a systematic way.", False),
        ("I prefer tasks that follow clear procedures and guidelines.", False),
        ("I like working with numbers, spreadsheets, or detailed reports.", False),
        ("I am good at following instructions carefully and accurately.", False),
        ("I find repetitive or highly structured tasks frustrating and boring.", True),
        ("I prefer work that is unpredictable and constantly changing.", True),
    ]
    for text, rev in conventional_qs:
        q = _likert_q("conventional_interest", text, rev)
        q["section"] = section
        qs.append(q)

    # DIMENSION 6: Realistic Interest (6 questions)
    realistic_qs = [
        ("I enjoy working with my hands to build or fix things.", False),
        ("I like using tools, machines, or equipment to accomplish tasks.", False),
        ("I prefer practical, concrete tasks over abstract or theoretical ones.", False),
        ("I enjoy outdoor activities and working with nature or animals.", False),
        ("I find physical or mechanical tasks uninteresting.", True),
        ("I prefer working with ideas and concepts rather than objects and tools.", True),
    ]
    for text, rev in realistic_qs:
        q = _likert_q("realistic_interest", text, rev)
        q["section"] = section
        qs.append(q)

    return qs


# ─── MAIN SEED FUNCTION ────────────────────────────────────────────────────

def get_all_questions():
    return (
        _personality_questions() +
        _learning_style_questions() +
        _skills_abilities_questions() +
        _career_interest_questions()
    )


async def seed_question_bank():
    existing = await question_banks_collection.count_documents({"section": {"$exists": True}})
    if existing > 0:
        return
    await question_banks_collection.delete_many({})
    questions = get_all_questions()
    if questions:
        await question_banks_collection.insert_many(questions)
