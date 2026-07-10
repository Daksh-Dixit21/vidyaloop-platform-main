import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Send, Sparkles, User, Bot, BookOpen, Brain, RotateCw, ChevronDown, ChevronUp } from 'lucide-react';

const Tutor = () => {
  const chatContainerRef = useRef(null);
  
  const initialMessage = {
    id: 1,
    type: 'ai',
    text: "Hi there! I'm Chintu, your personal learning assistant. I'm here to help you understand concepts, solve problems, and guide you through your studies. What would you like to learn about today?",
    showActions: false,
    question: null
  };
  
  const [messages, setMessages] = useState([initialMessage]);
  const [inputText, setInputText] = useState('');
  const [explanationMode, setExplanationMode] = useState('step-by-step');
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const [showExplanationStyles, setShowExplanationStyles] = useState(false);

  // Generic suggested questions (style-agnostic)
  const suggestedQuestions = [
    "What is photosynthesis?",
    "What is Pythagoras theorem?",
    "What is inflation?",
    "Why do we procrastinate?",
    "Help me revise for exams",
    "Test my knowledge with a quiz"
  ];
  
  // Show only first 3 suggestions initially
  const displayedSuggestions = showAllSuggestions ? suggestedQuestions : suggestedQuestions.slice(0, 3);

  // Explanation mode options
  const explanationModes = [
    { id: 'quick', label: 'Quick Answer', mobileLabel: 'Quick', icon: '⚡' },
    { id: 'step-by-step', label: 'Step-by-Step', mobileLabel: 'Steps', icon: '📝' },
    { id: 'detailed', label: 'Detailed Deep Dive', mobileLabel: 'In-Depth', icon: '🔍' },
    { id: 'simple', label: 'Explain Like I\'m 10', mobileLabel: 'Simple', icon: '🎈' }
  ];

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, chatContainerRef]);

  // Reset/Refresh chat
  const handleStartNewChat = () => {
    setMessages([initialMessage]);
    setInputText('');
    setExplanationMode('step-by-step');
  };

  const handlePractice = () => {
    const practiceMessage = {
      id: messages.length + 1,
      type: 'ai',
      text: "Great! Here's a practice problem:\n\nA right triangle has sides of length 3 cm and 4 cm. What is the length of the hypotenuse?\n\nTake your time to work through it, and let me know your answer!",
      showActions: false
    };
    setMessages([...messages, practiceMessage]);
  };

  const handleQuiz = () => {
    const quizMessage = {
      id: messages.length + 1,
      type: 'ai',
      text: "Let's test your understanding! Here's a quick quiz:\n\nQuestion 1: In a right triangle, if one side is 5 cm and another is 12 cm, what is the hypotenuse?\n\nA) 13 cm\nB) 17 cm\nC) 15 cm\nD) 10 cm\n\nTake your best guess and let me know!",
      showActions: false
    };
    setMessages([...messages, quizMessage]);
  };

  // Handle suggestion chip click
  const handleSuggestionClick = (suggestion) => {
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: suggestion
    };
    
    // Determine topic from question
    let topic = "";
    if (suggestion.includes("Pythagoras")) {
      topic = "pythagoras";
    } else if (suggestion.includes("photosynthesis")) {
      topic = "photosynthesis";
    } else if (suggestion.includes("inflation")) {
      topic = "inflation";
    } else if (suggestion.includes("procrastinate")) {
      topic = "procrastinate";
    } else if (suggestion.includes("revise")) {
      topic = "revise";
    } else if (suggestion.includes("quiz")) {
      topic = "quiz";
    }

    const aiMessage = {
      id: messages.length + 2,
      type: 'ai',
      text: getMockResponse(topic, explanationMode),
      showActions: true,
      question: suggestion,
      topic: topic
    };
    
    setMessages([...messages, userMessage, aiMessage]);
  };

  // Handle style change and regenerate response
  const handleStyleChange = (messageId, newStyle) => {
    setMessages(prevMessages => 
      prevMessages.map(msg => {
        if (msg.id === messageId && msg.type === 'ai' && msg.topic) {
          return {
            ...msg,
            text: getMockResponse(msg.topic, newStyle)
          };
        }
        return msg;
      })
    );
    setExplanationMode(newStyle);
  };

  // Mock response generator based on mode
  const getMockResponse = (topic, mode) => {
    const responses = {
      pythagoras: {
        quick: "The Pythagorean theorem: a² + b² = c². It relates the sides of a right triangle.",
        'step-by-step': "Let me explain the Pythagorean theorem step by step:\n\n1. It applies to right-angled triangles only\n2. Formula: a² + b² = c²\n3. 'c' is the hypotenuse (longest side)\n4. 'a' and 'b' are the other two sides\n\nExample: If a=3 and b=4, then c² = 9 + 16 = 25, so c=5",
        detailed: "The Pythagorean theorem is one of the most important principles in geometry, discovered by the ancient Greek mathematician Pythagoras.\n\nIn a right-angled triangle, the square of the length of the hypotenuse (the side opposite the right angle) is equal to the sum of squares of the other two sides.\n\nFormula: a² + b² = c²\n\nThis theorem has countless applications in mathematics, physics, engineering, and everyday life. It helps us calculate distances, build structures, and solve complex problems.",
        simple: "Imagine you have a triangle with one corner that's a perfect 90-degree angle (like the corner of a book).\n\nThe Pythagorean theorem is like a magic rule that helps you find how long the longest side is!\n\nIf you know the other two sides, you can multiply each by itself, add them together, and then find what number times itself equals that sum. That's your longest side! 📐✨"
      },
      math: {
        quick: "Here's a problem: Find the area of a rectangle with length 8 cm and width 5 cm. Answer: 8 × 5 = 40 cm²",
        'step-by-step': "Let's solve: Find the area of a rectangle (length=8cm, width=5cm)\n\nStep 1: Identify the formula → Area = length × width\nStep 2: Plug in values → Area = 8 × 5\nStep 3: Calculate → Area = 40 cm²\n\nAnswer: 40 cm²",
        detailed: "Problem: Calculate the area of a rectangle with length 8 cm and width 5 cm.\n\nConcept: Area measures the space inside a 2D shape.\nFormula: Area of rectangle = length × width\n\nSolution Process:\n- Given: length = 8 cm, width = 5 cm\n- Apply formula: A = l × w\n- Substitute: A = 8 × 5\n- Calculate: A = 40 cm²\n\nVerification: Count unit squares or use grid method\nReal-life application: Calculating floor space, painting walls, etc.",
        simple: "Let's say you have a chocolate bar that's 8 squares long and 5 squares wide. How many chocolate pieces do you have in total?\n\nYou count: 8 × 5 = 40 pieces! 🍫\n\nThat's exactly how we find the area of a rectangle!"
      },
      algebra: {
        quick: "Practice: Solve for x: 2x + 5 = 13. Answer: x = 4",
        'step-by-step': "Practice Questions:\n\n1. Solve: 2x + 5 = 13\n   Step 1: Subtract 5 from both sides → 2x = 8\n   Step 2: Divide by 2 → x = 4\n\n2. Solve: 3x - 7 = 14\n   Try this yourself using the same steps!",
        detailed: "Algebra Practice Questions:\n\nQuestion 1: Solve for x: 2x + 5 = 13\n\nSolution:\n• Step 1: Isolate the term with x by subtracting 5 from both sides\n  2x + 5 - 5 = 13 - 5\n  2x = 8\n\n• Step 2: Divide both sides by the coefficient of x (which is 2)\n  2x ÷ 2 = 8 ÷ 2\n  x = 4\n\n• Verification: Substitute x=4 back: 2(4) + 5 = 8 + 5 = 13 ✓\n\nQuestion 2: Now you try: 3x - 7 = 14",
        simple: "Think of algebra like a mystery box! 🎁\n\nIf I tell you: 2 × (mystery number) + 5 = 13\n\nHow do we find the mystery number?\n\n1. First, take away the 5: 2 × (mystery) = 8\n2. Then divide by 2: mystery = 4\n\nThe mystery number is 4! That's algebra - solving for the mystery number (we call it 'x')!"
      },
      photosynthesis: {
        quick: "Photosynthesis: Plants use sunlight, water, and CO2 to make food (glucose) and release oxygen.",
        'step-by-step': "Photosynthesis - How Plants Make Food:\n\nStep 1: Plants absorb sunlight through their leaves\nStep 2: Roots take in water from the soil\nStep 3: Leaves absorb carbon dioxide from the air\nStep 4: Using chlorophyll, plants convert these into glucose (food) and oxygen\nStep 5: Oxygen is released into the air for us to breathe!\n\nFormula: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂",
        detailed: "Photosynthesis: The Life-Sustaining Process\n\nPhotosynthesis is the process by which green plants, algae, and some bacteria convert light energy (usually from the sun) into chemical energy stored in glucose.\n\nThe Process:\n\n1. Light Absorption:\n   • Chlorophyll (green pigment) in chloroplasts captures sunlight\n   • Primarily occurs in the leaves\n\n2. Raw Materials:\n   • Carbon dioxide (CO₂) from air enters through stomata\n   • Water (H₂O) absorbed by roots travels to leaves\n\n3. Chemical Reaction:\n   6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂\n   (carbon dioxide + water + light → glucose + oxygen)\n\n4. Products:\n   • Glucose: Used for plant growth and energy\n   • Oxygen: Released into atmosphere\n\nImportance:\n• Produces oxygen for all aerobic life\n• Base of most food chains\n• Removes CO₂ from atmosphere",
        simple: "Imagine plants are like little chefs who cook using sunlight! ☀️🌱\n\nHere's their recipe:\n• Ingredient 1: Sunlight (like the stove heat)\n• Ingredient 2: Water from the ground\n• Ingredient 3: Air (the invisible stuff around us)\n\nThe plant mixes these together and makes:\n• Food for itself to grow big and strong! 🍃\n• Fresh air (oxygen) for us to breathe! 😊\n\nThat's why plants are so special - they make their own food and help us breathe!"
      },
      revise: {
        quick: "Quick revision tips: Review notes daily, practice problems, create flashcards, teach concepts to others.",
        'step-by-step': "Exam Revision Strategy:\n\nStep 1: Organize your study materials and create a schedule\nStep 2: Break topics into smaller chunks\nStep 3: Review notes and highlight key concepts\nStep 4: Practice with past papers or sample questions\nStep 5: Test yourself regularly\nStep 6: Take short breaks to stay fresh\nStep 7: Revise difficult topics multiple times\n\nRemember: Consistent daily study beats last-minute cramming!",
        detailed: "Comprehensive Exam Revision Guide:\n\n1. Planning Phase (Week before):\n   • List all topics to cover\n   • Identify weak areas that need more time\n   • Create a realistic study timetable\n   • Gather all materials (notes, textbooks, practice papers)\n\n2. Active Learning Techniques:\n   • Summarize notes in your own words\n   • Create mind maps for visual connections\n   • Use flashcards for memorization\n   • Practice explaining concepts aloud\n   • Teach topics to a study buddy\n\n3. Practice and Testing:\n   • Solve previous years' question papers\n   • Time yourself to build exam speed\n   • Review mistakes thoroughly\n   • Take mock tests in exam-like conditions\n\n4. Memory Retention:\n   • Use mnemonics for complex information\n   • Review same material on different days\n   • Sleep well (memory consolidation happens during sleep)\n   • Stay hydrated and eat brain-boosting foods\n\n5. Exam Day Strategy:\n   • Review key formulas/concepts in the morning\n   • Stay calm and confident\n   • Read questions carefully\n   • Manage time wisely during the exam\n\nYou've got this! 📚✨",
        simple: "How to Study for Exams:\n\n🎯 Make it fun!\n• Turn your notes into colorful posters\n• Make up silly songs to remember things\n• Play quiz games with friends\n\n⏰ Study smart:\n• Study a little bit every day (not all at once!)\n• Take breaks to play or snack\n• Ask for help when something is confusing\n\n💪 Stay happy:\n• Get good sleep\n• Eat yummy healthy food\n• Believe in yourself!\n\nYou're going to do great! 🌟"
      },
      quiz: {
        quick: "Quiz: What is 7 × 8? (A) 54 (B) 56 (C) 64 (D) 49. Try it!",
        'step-by-step': "Let's test your knowledge!\n\nQuestion 1: What is the value of 7 × 8?\nA) 54\nB) 56\nC) 64\nD) 49\n\nHow to solve:\nStep 1: Recall or calculate 7 × 8\nStep 2: 7 × 8 = 56\nStep 3: Match with options → Answer is B\n\nNow you try! What's your answer?",
        detailed: "Knowledge Test - Mathematics\n\nQuestion 1: Multiplication\nWhat is the value of 7 × 8?\n\nOptions:\nA) 54\nB) 56 ✓\nC) 64\nD) 49\n\nExplanation:\n• Method 1: Direct multiplication → 7 × 8 = 56\n• Method 2: Break it down → (7 × 5) + (7 × 3) = 35 + 21 = 56\n• Method 3: Skip counting → 8, 16, 24, 32, 40, 48, 56\n\nCommon Mistakes:\n• Confusing with 7 × 7 = 49\n• Mixing up with 8 × 8 = 64\n\nTip: Practice multiplication tables regularly for quick recall!\n\nReady for the next question?",
        simple: "Let's play a fun quiz game! 🎮\n\nQuestion: If you have 7 bags, and each bag has 8 candies, how many candies do you have in total?\n\n🍬 Count with me:\nBag 1: 8 candies\nBag 2: 8 more = 16\nBag 3: 8 more = 24\n...keep going...\n\nOr use the quick trick: 7 × 8 = 56 candies! 🎉\n\nA) 54  B) 56  C) 64  D) 49\n\nWhat's your guess?"
      },
      inflation: {
        quick: "Inflation: The general increase in prices over time, making money less valuable.",
        'step-by-step': "Understanding Inflation:\n\nStep 1: Inflation means prices go up over time\nStep 2: When inflation happens, your money buys less than before\nStep 3: Example: If a chocolate costs ₹10 today, it might cost ₹12 next year\nStep 4: Central banks try to keep inflation stable (usually 2-4%)\nStep 5: Too much inflation is bad; too little can also slow the economy\n\nCommon causes: More money in circulation, increased demand, higher production costs",
        detailed: "Inflation: A Comprehensive Overview\n\nDefinition:\nInflation is the rate at which the general level of prices for goods and services rises, causing purchasing power to fall.\n\nHow it Works:\n• When prices rise, each unit of currency buys fewer goods/services\n• Measured as annual percentage change (e.g., 3% inflation rate)\n• Calculated using Consumer Price Index (CPI)\n\nCauses of Inflation:\n1. Demand-Pull Inflation:\n   • Too much money chasing too few goods\n   • Increased consumer spending\n\n2. Cost-Push Inflation:\n   • Rising production costs (wages, raw materials)\n   • Companies pass costs to consumers\n\n3. Built-In Inflation:\n   • Workers demand higher wages\n   • Companies raise prices to cover wage increases\n\nEffects:\n• Positive: Encourages spending/investment, reduces debt burden\n• Negative: Erodes savings, uncertainty in planning, hurts fixed-income earners\n\nReal Example:\nIf inflation is 5% per year, something that costs ₹100 today will cost ₹105 next year.",
        simple: "What is Inflation? 🪙\n\nImagine you have ₹100 and your favorite toy costs ₹100.\n\nToday: You can buy the toy! ✓\n\nNext year: The same toy now costs ₹110 (prices went up)\nBut you still have ₹100... so you can't buy it anymore! ☹️\n\nThat's inflation - when things get more expensive over time!\n\nIt's like your money loses its superpower to buy things. That's why grown-ups always say 'money was worth more in the old days!' 📈"
      },
      procrastinate: {
        quick: "Procrastination: Delaying tasks despite knowing it may cause problems. Common causes: fear, perfectionism, lack of motivation.",
        'step-by-step': "Why We Procrastinate:\n\nStep 1: Our brain seeks instant pleasure and avoids discomfort\nStep 2: Difficult/boring tasks feel overwhelming\nStep 3: We tell ourselves 'I'll do it later'\nStep 4: The deadline gets closer, causing stress\nStep 5: We finally rush to complete the task\n\nCommon Reasons:\n• Fear of failure or success\n• Perfectionism (wanting it to be 'just right')\n• Task seems too big or unclear\n• Lack of immediate reward\n• Distractions (phone, social media, games)\n\nHow to Beat It:\n1. Break tasks into tiny steps\n2. Start with just 5 minutes\n3. Remove distractions\n4. Reward yourself after completing tasks",
        detailed: "Understanding Procrastination: A Psychological Perspective\n\nDefinition:\nProcrastination is the voluntary delay of intended actions despite expecting negative consequences.\n\nThe Science Behind It:\n\n1. Temporal Discounting:\n   • Our brain values immediate rewards over future benefits\n   • Future consequences feel abstract and distant\n\n2. Emotional Regulation:\n   • We procrastinate to avoid negative emotions (anxiety, boredom, frustration)\n   • Short-term mood repair takes priority over long-term goals\n\n3. Present Bias:\n   • Current self wants comfort\n   • Future self has to deal with consequences\n\nCommon Triggers:\n• Perfectionism: Fear of not meeting high standards\n• Low self-efficacy: Doubting ability to complete task\n• Task aversiveness: Boring, difficult, or unclear tasks\n• Impulsiveness: Difficulty resisting temptations\n• Abstract goals: Unclear or distant outcomes\n\nOvercoming Strategies:\n\n1. Implementation Intentions:\n   • Specify when, where, how you'll work\n   • Example: 'I will study math at 4 PM at my desk'\n\n2. Temptation Bundling:\n   • Pair unpleasant tasks with enjoyable activities\n   • Listen to favorite music while studying\n\n3. Pre-commitment:\n   • Remove future temptations in advance\n   • Put phone in another room before studying\n\n4. Self-compassion:\n   • Don't beat yourself up\n   • Forgive past procrastination and focus forward\n\nRemember: Procrastination is normal, but you can develop better habits! 🎯",
        simple: "Why Do We Procrastinate? 🤔\n\nYour brain has two voices:\n\n🦸 Smart Voice: 'Let's do homework now!'\n😴 Lazy Voice: 'But playing games is more fun!'\n\nThe lazy voice often wins because:\n• Homework feels hard or boring right now\n• Games feel fun right now\n• Tomorrow seems far away\n\nIt's like choosing between eating a yummy cookie now vs. getting 10 cookies next week. Most people pick the cookie now!\n\nHow to Win:\n1. Start super small (just 2 minutes!)\n2. Make it fun (race the timer!)\n3. Give yourself mini rewards (snack after finishing!)\n4. Ask someone to help keep you on track\n\nYour brain learns: 'Hey, this wasn't so bad!' And next time, it gets easier! 💪✨"
      }
    };

    return responses[topic]?.[mode] || "I'm here to help! Ask me anything about your studies.";
  };

  // Follow-up action handlers
  const handleMorePractice = () => {
    const practiceMessage = {
      id: messages.length + 1,
      type: 'ai',
      text: "Great! Here are more practice questions:\n\n1. If a = 5 and b = 12, find c in a right triangle\n2. Calculate the area of a circle with radius 7 cm\n3. Solve: 4x + 10 = 30\n\nTry these and let me know your answers!",
      showActions: true
    };
    setMessages([...messages, practiceMessage]);
  };

  const handleSimplify = () => {
    const simpleMessage = {
      id: messages.length + 1,
      type: 'ai',
      text: "Let me explain that in a simpler way:\n\nThink of it like this - imagine you're building with blocks. Each concept is like a building block that connects to others. When you understand one block, the next one becomes easier!\n\nWould you like me to break down any specific part?",
      showActions: true
    };
    setMessages([...messages, simpleMessage]);
  };

  const handleTestMe = () => {
    const testMessage = {
      id: messages.length + 1,
      type: 'ai',
      text: "Time for a quick test! 📝\n\nQuestion: Based on what we just discussed, can you explain the main concept in your own words?\n\nTake your time and give it a try. I'll provide feedback on your answer!",
      showActions: false
    };
    setMessages([...messages, testMessage]);
  };

  const handleRealLifeExamples = () => {
    const exampleMessage = {
      id: messages.length + 1,
      type: 'ai',
      text: "Real-life applications:\n\n🏗️ Architecture: Calculating building measurements and structural integrity\n📐 Navigation: Finding shortest distances using coordinate geometry\n🎨 Art & Design: Using geometric principles for perspective and proportions\n⚽ Sports: Analyzing trajectories and angles in games\n💻 Technology: Coding, graphics, game development - math is everywhere!\n\nPretty cool, right? Math is all around us!",
      showActions: true
    };
    setMessages([...messages, exampleMessage]);
  };

  const handleSend = () => {
    if (inputText.trim()) {
      const userMessage = {
        id: messages.length + 1,
        type: 'user',
        text: inputText
      };
      
      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        text: `Great question! Based on your ${explanationModes.find(m => m.id === explanationMode)?.label} preference, here's my response:\n\n${inputText.includes('?') ? 'Let me help you understand this concept better.' : 'I can help you with that!'}\n\nFeel free to ask follow-up questions or try a different explanation style using the buttons below!`,
        showActions: true,
        question: inputText,
        topic: null
      };
      
      setMessages([...messages, userMessage, aiMessage]);
      setInputText('');
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col page-fade-in">
        {/* Premium Glassmorphism Header - VidyaLoop Brand Blue */}
        <div className="relative mb-6 sm:mb-8 animate-fade-in">
          {/* Gradient background glow - Brand Blue */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-cyan-100 to-blue-100 rounded-2xl sm:rounded-3xl blur-xl opacity-60"></div>
          
          {/* Main header card */}
          <div className="relative bg-gradient-to-br from-white/90 via-white/80 to-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/50 shadow-xl p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Premium Icon with Glow - Brand Blue */}
                <div className="relative group">
                  {/* Glow effect - Brand Blue */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" style={{background: 'linear-gradient(to bottom right, #33aaff, #1e90ff)'}}></div>
                  {/* Icon container - Brand Blue */}
                  <div className="relative p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-2xl transform group-hover:scale-110 transition-all duration-300" style={{background: 'linear-gradient(to bottom right, #33aaff, #1e90ff)'}}>
                    <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-lg animate-pulse-subtle" />
                  </div>
                </div>
                
                {/* Typography - Brand Blue Gradient */}
                <div className="space-y-0.5 sm:space-y-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black animate-gradient-x" style={{
                    background: 'linear-gradient(to right, #33aaff, #1e90ff, #33aaff)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Chintu
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">
                    Your AI Study Buddy ✨
                  </p>
                </div>
              </div>
              
              {/* New Chat Button - Brand Blue */}
              <button
                onClick={handleStartNewChat}
                className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 text-white rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-sm hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                style={{background: 'linear-gradient(to right, #33aaff, #1e90ff)'}}
              >
                <RotateCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-180 transition-transform duration-500" />
                <span className="hidden sm:inline">New Chat</span>
                <span className="sm:hidden">New</span>
              </button>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div 
          ref={chatContainerRef}
          className="flex-1 bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-4 lg:p-6 overflow-y-auto mb-4 sm:mb-6"
        >
          <div className="space-y-4 sm:space-y-6">
            {messages.map((message) => (
              <div key={message.id}>
                <div
                  className={`flex gap-2 sm:gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'ai' && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-sm">
                        <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 ${
                      message.type === 'user'
                        ? 'text-white shadow-sm'
                        : 'bg-gray-50 text-gray-800 border border-gray-100'
                    }`}
                    style={message.type === 'user' ? {background: '#4EC0F4'} : {}}
                  >
                    <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
                      {message.text}
                    </p>
                  </div>

                  {message.type === 'user' && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-sm">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Try Another Style + Follow-up Actions */}
                {message.type === 'ai' && message.showActions && (
                  <div className="ml-10 sm:ml-[52px]">
                    {/* Try Another Style - Only show if message has a topic */}
                    {message.topic && (
                      <div className="mb-2 mt-2 sm:mt-3">
                        <p className="text-xs text-gray-500 mb-1.5">Try another explanation style:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {explanationModes.filter(mode => mode.id !== explanationMode).map((mode) => (
                            <button
                              key={mode.id}
                              onClick={() => handleStyleChange(message.id, mode.id)}
                              className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 text-purple-700 rounded-lg text-xs font-medium hover:from-purple-100 hover:to-pink-100 toggle-smooth btn-press-scale"
                            >
                              <span className="mr-1">{mode.icon}</span>
                              <span className="hidden sm:inline">{mode.label}</span>
                              <span className="sm:hidden">{mode.mobileLabel}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Other Follow-up Actions */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      <button 
                        onClick={handleMorePractice}
                        className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-50 transition-all"
                      >
                        📚 More practice
                      </button>
                      <button 
                        onClick={handleSimplify}
                        className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-50 transition-all"
                      >
                        Explain simpler
                      </button>
                      <button 
                        onClick={handleTestMe}
                        className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-cyan-500 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-cyan-600 transition-all"
                      >
                        🧠 Test me
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Clean Input Area */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 shadow-sm">
          {/* Suggested Questions - Only show when chat is empty */}
          {messages.length === 1 && (
            <div className="mb-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-3 flex items-center gap-1.5">
                <span>💡</span>
                <span>Try asking:</span>
              </p>
              <div className="flex flex-col gap-2.5 sm:gap-2">
                {displayedSuggestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleSuggestionClick(question)}
                    className="text-left px-4 py-3 sm:px-4 sm:py-2.5 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 text-cyan-700 rounded-xl font-medium hover:from-cyan-100 hover:to-blue-100 hover:border-cyan-300 color-transition btn-press-scale text-base sm:text-sm"
                  >
                    {question}
                  </button>
                ))}
                
                {/* View More Button */}
                {suggestedQuestions.length > 3 && (
                  <button
                    onClick={() => setShowAllSuggestions(!showAllSuggestions)}
                    className="text-left px-3 sm:px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-50 color-transition btn-press flex items-center justify-between"
                  >
                    <span>{showAllSuggestions ? 'Show less' : `View ${suggestedQuestions.length - 3} more suggestions`}</span>
                    {showAllSuggestions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Always Visible Explanation Style Selector */}
          <div className="mb-3">
            <p className="text-xs sm:text-sm font-medium text-gray-600 mb-2 flex items-center gap-1.5">
              <span>🎯</span>
              <span>Choose your learning style:</span>
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {explanationModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setExplanationMode(mode.id)}
                  className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium toggle-smooth btn-press-scale ${
                    explanationMode === mode.id
                      ? 'text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  style={explanationMode === mode.id ? {background: '#4EC0F4'} : {}}
                >
                  <span className="mr-1">{mode.icon}</span>
                  <span className="hidden sm:inline">{mode.label}</span>
                  <span className="sm:hidden">{mode.mobileLabel}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Input - Always Prominent - Thumb-friendly on mobile */}
          <div className="flex items-end gap-2 sm:gap-2">
            <div className="flex-1">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask Chintu anything..."
                className="w-full px-4 sm:px-4 py-3 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 resize-none text-gray-700 placeholder:text-gray-400 transition-all text-base"
                rows="2"
              />
              <div className="flex items-center justify-between mt-2 px-1">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span>Chintu is online</span>
                </div>
                <span className="text-xs text-gray-400 hidden sm:block">Press Enter to send</span>
              </div>
            </div>
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className={`flex-shrink-0 p-4 sm:p-3 rounded-xl font-semibold btn-press-scale ${
                inputText.trim()
                  ? 'text-white shadow-md'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              style={inputText.trim() ? {background: '#4EC0F4'} : {}}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Tutor;
