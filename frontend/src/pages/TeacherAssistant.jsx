import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { 
  Sparkles, BookOpen, FileQuestion, Activity, 
  ClipboardList, Download, Share2, Copy, Check,
  ChevronDown, ChevronUp, Lightbulb, Zap, Play
} from 'lucide-react';

// Pre-loaded demo data for "Try Me" feature - EASILY EDITABLE
const photosynthesisData = {
  topic: 'Photosynthesis',
  class: 'Class 6',
  subject: 'Science',
  notes: {
    definition: 'Photosynthesis is the process by which green plants make their own food using sunlight, carbon dioxide, and water in the presence of chlorophyll.',
    keyConcepts: [
      'Sunlight provides energy',
      'Chlorophyll captures sunlight',
      'Carbon dioxide is taken from air',
      'Water is absorbed from soil',
      'Glucose is produced',
      'Oxygen is released'
    ],
    explanation: 'Plants use sunlight to convert carbon dioxide and water into food. This process mainly happens in leaves.',
    example: 'Plants grow better in sunlight than in darkness.'
  },
  quiz: {
    mcqs: [
      {
        question: 'What is the main source of energy for photosynthesis?',
        options: ['Water', 'Sunlight', 'Oxygen', 'Soil'],
        answer: 'B',
        explanation: 'Sunlight is the primary energy source that drives the photosynthesis process.'
      },
      {
        question: 'Which gas is taken in by plants?',
        options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'],
        answer: 'C',
        explanation: 'Plants absorb carbon dioxide from the air during photosynthesis.'
      },
      {
        question: 'What is the green pigment in leaves called?',
        options: ['Chlorophyll', 'Hemoglobin', 'Enzyme', 'Protein'],
        answer: 'A',
        explanation: 'Chlorophyll is the green pigment that captures sunlight energy.'
      },
      {
        question: 'What is produced as food in photosynthesis?',
        options: ['Oxygen', 'Carbon dioxide', 'Glucose', 'Nitrogen'],
        answer: 'C',
        explanation: 'Glucose (sugar) is the food produced by plants during photosynthesis.'
      },
      {
        question: 'Which part of the plant mainly performs photosynthesis?',
        options: ['Root', 'Stem', 'Leaf', 'Flower'],
        answer: 'C',
        explanation: 'Leaves are the primary site of photosynthesis in most plants.'
      }
    ],
    shortAnswer: [
      {
        question: 'What is photosynthesis?',
        answer: 'Photosynthesis is the process by which green plants make their own food using sunlight, carbon dioxide, and water.'
      },
      {
        question: 'Why is sunlight important for plants?',
        answer: 'Sunlight provides the energy needed for plants to convert carbon dioxide and water into food (glucose). Without sunlight, plants cannot perform photosynthesis.'
      }
    ],
    application: {
      question: 'A plant is kept in a dark room for 3 days. What will happen and why?',
      answer: 'The plant will become weak and may start turning pale or yellow. This happens because without sunlight, the plant cannot perform photosynthesis to make food. The chlorophyll breaks down, and the plant begins to use its stored energy. If kept in darkness for too long, the plant will eventually die.'
    }
  },
  activities: [
    {
      title: 'Sunlight vs Darkness Experiment',
      description: 'Keep one plant in sunlight and one in darkness and compare after 3 days. Observe differences in color, growth, and overall health.',
      duration: '3 days observation',
      materials: 'Two identical plants, one sunny spot, one dark cupboard'
    },
    {
      title: 'Leaf Observation Activity',
      description: 'Observe a leaf closely and discuss why it is green. Look at the veins, texture, and color. Relate this to the presence of chlorophyll.',
      duration: '15 minutes',
      materials: 'Fresh leaves, magnifying glass'
    },
    {
      title: 'Photosynthesis Role Play',
      description: 'Do a role play of photosynthesis where students act as sunlight, carbon dioxide, water, chlorophyll, glucose, and oxygen. Act out the entire process.',
      duration: '20-25 minutes',
      materials: 'Labels/cards for different elements, open space'
    }
  ],
  summary: 'Photosynthesis is the process by which plants make food using sunlight, water, and carbon dioxide. Oxygen is released as a by-product. This process is essential for plant survival and provides oxygen for all living beings.',
  homework: [
    'Draw and label the process of photosynthesis showing all inputs (sunlight, water, CO₂) and outputs (glucose, oxygen)',
    'Write 5 lines on why photosynthesis is important for life on Earth'
  ]
};

const TeacherAssistant = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [topic, setTopic] = useState('');
  const [subject, setSubject] = useState('');
  const [generatedKit, setGeneratedKit] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [copiedSection, setCopiedSection] = useState('');

  const subjects = [
    'Mathematics', 'Science', 'English', 'Hindi', 
    'Social Studies', 'Physics', 'Chemistry', 'Biology', 
    'Computer Science', 'Economics', 'History', 'Geography'
  ];

  const classes = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);

  // Mock AI response
  const generateTeachingKit = () => {
    if (!selectedClass || !topic) return;

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedKit({
        topic: topic,
        class: selectedClass,
        subject: subject || 'General',
        notes: {
          keyConcepts: [
            `${topic} is a fundamental concept in ${subject || 'this subject'}`,
            'Understanding this topic helps build strong foundation for advanced concepts',
            'Real-world applications are abundant and practical',
            'Students should focus on both theoretical and practical aspects'
          ],
          explanation: `${topic} is an important concept that students need to understand thoroughly. It forms the basis for many advanced topics and has practical applications in daily life. The concept can be broken down into simpler parts for better comprehension.`,
          examples: [
            `Daily life example: Using ${topic} while shopping or managing pocket money`,
            `Real-world application: How professionals use ${topic} in their work`,
            `Relatable scenario: ${topic} in sports, games, or hobbies`
          ]
        },
        quiz: {
          mcqs: [
            {
              question: `What is the primary application of ${topic}?`,
              options: ['Option A', 'Option B (Correct)', 'Option C', 'Option D'],
              answer: 'B',
              explanation: 'This demonstrates the core understanding of the concept.'
            },
            {
              question: `Which of the following best describes ${topic}?`,
              options: ['Definition A', 'Definition B', 'Definition C (Correct)', 'Definition D'],
              answer: 'C',
              explanation: 'This tests conceptual clarity.'
            },
            {
              question: `In real life, where do we commonly use ${topic}?`,
              options: ['Scenario A (Correct)', 'Scenario B', 'Scenario C', 'Scenario D'],
              answer: 'A',
              explanation: 'Connects theory to practical application.'
            },
            {
              question: `What is the most important aspect of ${topic}?`,
              options: ['Aspect A', 'Aspect B (Correct)', 'Aspect C', 'Aspect D'],
              answer: 'B',
              explanation: 'Focuses on key learning outcomes.'
            },
            {
              question: `How does ${topic} relate to other concepts?`,
              options: ['Connection A', 'Connection B', 'Connection C (Correct)', 'Connection D'],
              answer: 'C',
              explanation: 'Tests integrated understanding.'
            }
          ],
          shortAnswer: [
            {
              question: `Explain ${topic} in your own words with an example.`,
              answer: `Students should explain the core concept and provide a relatable example from their experience.`
            },
            {
              question: `List three real-life situations where ${topic} is useful.`,
              answer: `Answers should demonstrate practical understanding and application of the concept.`
            }
          ],
          application: {
            question: `Design a solution using ${topic} for a real-world problem in your school or community.`,
            answer: `Students should demonstrate creative application of the concept, showing both theoretical understanding and practical thinking. Look for: problem identification, concept application, feasibility, and creativity.`
          }
        },
        activities: [
          {
            title: 'Group Discussion Activity',
            description: `Divide class into groups of 4-5. Each group discusses real-life examples of ${topic} and presents their findings.`,
            duration: '15-20 minutes',
            materials: 'Chart paper, markers'
          },
          {
            title: 'Hands-on Practice',
            description: `Students work on practical problems related to ${topic}. They can work in pairs to solve and explain to each other.`,
            duration: '20-25 minutes',
            materials: 'Worksheets, calculators (if needed)'
          },
          {
            title: 'Creative Challenge',
            description: `Ask students to create a poster, skit, or presentation that explains ${topic} to younger students.`,
            duration: '30 minutes',
            materials: 'Art supplies, presentation tools'
          }
        ],
        summary: `${topic} is essential for ${selectedClass} students. Key points: understanding core concepts, recognizing real-world applications, and practicing through exercises. Students should be able to explain the concept, solve problems, and apply it in practical scenarios.`,
        homework: [
          `Complete 10 practice problems on ${topic} from textbook`,
          `Write a short paragraph (100 words) on how ${topic} is useful in daily life, with 2-3 examples`
        ]
      });
      setIsGenerating(false);
    }, 1500);
  };

  const generateSpecific = (type) => {
    if (!topic) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      // Generate only specific section
      generateTeachingKit();
    }, 1000);
  };

  // Try Me Demo - Loads pre-filled Photosynthesis content
  const loadDemoContent = () => {
    setIsGenerating(true);
    
    // Simulate loading with same timing as real generation
    setTimeout(() => {
      setGeneratedKit(photosynthesisData);
      setIsGenerating(false);
      // Optionally reset form fields to show it's a demo
      setSelectedClass(photosynthesisData.class);
      setTopic(photosynthesisData.topic);
      setSubject(photosynthesisData.subject);
    }, 1800); // Slightly longer to feel authentic
  };

  const modifyContent = (modifier) => {
    if (!generatedKit) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      // In a real implementation, this would call AI to modify content
      setIsGenerating(false);
    }, 1000);
  };

  const copyToClipboard = (content, section) => {
    navigator.clipboard.writeText(content);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(''), 2000);
  };

  const downloadPDF = () => {
    alert('PDF download functionality would be implemented with a library like jsPDF');
  };

  const shareWhatsApp = () => {
    const text = `Teaching Kit: ${generatedKit.topic}\nClass: ${generatedKit.class}\n\nGenerated with VidyaLoop Teacher Assistant`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-8 page-fade-in">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Teacher Assistant</h1>
            <p className="text-gray-600">Generate teaching materials in seconds with AI</p>
          </div>
          <div className="flex-shrink-0 p-3 rounded-xl" style={{background: '#4EC0F4'}}>
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-xl border border-premium p-6 shadow-premium">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Class Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Class <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            {/* Subject Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subject (Optional)
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                <option value="">All Subjects</option>
                {subjects.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            {/* Topic Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Topic <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Pythagoras Theorem"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
          </div>

          {/* Primary Button */}
          <button
            onClick={generateTeachingKit}
            disabled={!selectedClass || !topic || isGenerating}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-white rounded-xl font-bold hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{background: selectedClass && topic ? '#4EC0F4' : '#e5e7eb'}}
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate Teaching Kit</span>
              </>
            )}
          </button>

          {/* Try Me Demo Button */}
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          
          <button
            onClick={loadDemoContent}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 text-purple-700 rounded-xl font-bold hover:from-purple-100 hover:to-pink-100 hover:border-purple-300 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-5 h-5" />
            <span>Try Me (Demo: Photosynthesis)</span>
          </button>

          {/* Quick Actions */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-500 mb-3">Quick Actions</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => generateSpecific('notes')}
                disabled={!topic}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors disabled:opacity-50"
              >
                <BookOpen className="w-4 h-4" />
                <span>Create Notes</span>
              </button>
              <button
                onClick={() => generateSpecific('quiz')}
                disabled={!topic}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors disabled:opacity-50"
              >
                <FileQuestion className="w-4 h-4" />
                <span>Create Quiz</span>
              </button>
              <button
                onClick={() => generateSpecific('activities')}
                disabled={!topic}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors disabled:opacity-50"
              >
                <Activity className="w-4 h-4" />
                <span>Create Activities</span>
              </button>
              <button
                onClick={() => generateSpecific('summary')}
                disabled={!topic}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors disabled:opacity-50"
              >
                <ClipboardList className="w-4 h-4" />
                <span>Summarize</span>
              </button>
            </div>
          </div>
        </div>

        {/* Generated Content */}
        {generatedKit && (
          <div className="space-y-6 animate-fade-in">
            {/* Header with Export Options */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-xl border border-premium p-4 shadow-premium">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{generatedKit.topic}</h2>
                <p className="text-sm text-gray-600">{generatedKit.class} • {generatedKit.subject}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(JSON.stringify(generatedKit, null, 2), 'all')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
                >
                  {copiedSection === 'all' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  <span>Copy</span>
                </button>
                <button
                  onClick={downloadPDF}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>PDF</span>
                </button>
                <button
                  onClick={shareWhatsApp}
                  className="flex items-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg text-sm font-medium text-green-700 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* 1. Notes Section */}
            <div className="bg-white rounded-xl border border-premium p-6 shadow-premium">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Notes</h3>
                </div>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(generatedKit.notes, null, 2), 'notes')}
                  className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {copiedSection === 'notes' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-600" />}
                </button>
              </div>

              <div className="space-y-4">
                {/* Definition (if available - from photosynthesis demo) */}
                {generatedKit.notes.definition && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-2">Definition</h4>
                    <p className="text-gray-700 leading-relaxed bg-blue-50 p-3 rounded-lg border border-blue-100">
                      {generatedKit.notes.definition}
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-2">Key Concepts</h4>
                  <ul className="space-y-2">
                    {generatedKit.notes.keyConcepts.map((concept, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{background: '#4EC0F4'}}></span>
                        <span>{concept}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-2">{generatedKit.notes.definition ? 'Explanation' : 'Simple Explanation'}</h4>
                  <p className="text-gray-700 leading-relaxed">{generatedKit.notes.explanation}</p>
                </div>

                {/* Example field - used in photosynthesis demo */}
                {generatedKit.notes.example && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-2">Example</h4>
                    <div className="flex items-start gap-2 text-gray-700 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                      <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>{generatedKit.notes.example}</span>
                    </div>
                  </div>
                )}

                {/* Examples array - used in generic generation */}
                {generatedKit.notes.examples && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-2">Real-Life Examples</h4>
                    <ul className="space-y-2">
                      {generatedKit.notes.examples.map((example, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Quiz Section */}
            <div className="bg-white rounded-xl border border-premium p-6 shadow-premium">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-50">
                    <FileQuestion className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Quiz</h3>
                </div>
                <button
                  onClick={() => setShowAnswers(!showAnswers)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
                >
                  {showAnswers ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  <span>{showAnswers ? 'Hide' : 'Show'} Answers</span>
                </button>
              </div>

              <div className="space-y-6">
                {/* MCQs */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-3">Multiple Choice Questions</h4>
                  <div className="space-y-4">
                    {generatedKit.quiz.mcqs.map((mcq, idx) => (
                      <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                        <p className="font-semibold text-gray-900 mb-2">Q{idx + 1}. {mcq.question}</p>
                        <div className="space-y-1.5 ml-4">
                          {mcq.options.map((option, optIdx) => (
                            <p key={optIdx} className="text-sm text-gray-700">{String.fromCharCode(65 + optIdx)}. {option}</p>
                          ))}
                        </div>
                        {showAnswers && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-sm font-semibold text-green-700">Answer: {mcq.answer}</p>
                            <p className="text-sm text-gray-600 mt-1">{mcq.explanation}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Short Answer */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-3">Short Answer Questions</h4>
                  <div className="space-y-4">
                    {generatedKit.quiz.shortAnswer.map((sa, idx) => (
                      <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                        <p className="font-semibold text-gray-900 mb-2">Q{idx + 1}. {sa.question}</p>
                        {showAnswers && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-sm font-semibold text-green-700 mb-1">Expected Answer:</p>
                            <p className="text-sm text-gray-600">{sa.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Application Based */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-3">Application-Based Question</h4>
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                    <p className="font-semibold text-gray-900 mb-2">{generatedKit.quiz.application.question}</p>
                    {showAnswers && (
                      <div className="mt-3 pt-3 border-t border-blue-200">
                        <p className="text-sm font-semibold text-blue-700 mb-1">Evaluation Criteria:</p>
                        <p className="text-sm text-gray-700">{generatedKit.quiz.application.answer}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Activities Section */}
            <div className="bg-white rounded-xl border border-premium p-6 shadow-premium">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green-50">
                  <Activity className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Classroom Activities</h3>
              </div>

              <div className="space-y-4">
                {generatedKit.activities.map((activity, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-2">{idx + 1}. {activity.title}</h4>
                    <p className="text-gray-700 mb-3">{activity.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                        ⏱️ {activity.duration}
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                        📦 {activity.materials}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Summary Section */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-6 shadow-premium">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-amber-100">
                  <Zap className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Quick Summary</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{generatedKit.summary}</p>
            </div>

            {/* 5. Homework Section */}
            <div className="bg-white rounded-xl border border-premium p-6 shadow-premium">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-indigo-50">
                  <ClipboardList className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Homework</h3>
              </div>

              <ul className="space-y-3">
                {generatedKit.homework.map((task, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{background: '#4EC0F4'}}>
                      {idx + 1}
                    </span>
                    <span className="text-gray-700 pt-0.5">{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Smart Modifiers */}
            <div className="bg-white rounded-xl border border-premium p-4 shadow-premium">
              <p className="text-xs font-semibold text-gray-500 mb-3">Modify Content</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => modifyContent('simpler')}
                  className="px-4 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-sm font-medium text-blue-700 transition-colors"
                >
                  Make it simpler
                </button>
                <button
                  onClick={() => modifyContent('advanced')}
                  className="px-4 py-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg text-sm font-medium text-purple-700 transition-colors"
                >
                  Make it advanced
                </button>
                <button
                  onClick={() => modifyContent('activities')}
                  className="px-4 py-2 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg text-sm font-medium text-green-700 transition-colors"
                >
                  More activities
                </button>
                <button
                  onClick={() => modifyContent('hinglish')}
                  className="px-4 py-2 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg text-sm font-medium text-orange-700 transition-colors"
                >
                  Explain in Hinglish
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!generatedKit && !isGenerating && (
          <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/30 rounded-xl border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{background: '#4EC0F4'}}>
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Generate Teaching Materials</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Select a class and enter a topic to generate comprehensive teaching materials in seconds
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TeacherAssistant;
