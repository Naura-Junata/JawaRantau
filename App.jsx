import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Gamepad2, 
  Search, 
  User, 
  Music, 
  Music4, 
  LogOut, 
  ChevronRight, 
  CheckCircle2, 
  XCircle,
  Trophy,
  Flame
} from 'lucide-react';

// --- DATA MOCKUP ---

const DICTIONARY = [
  { id: 1, indo: 'Saya', ngoko: 'Aku', krama: 'Kula' },
  { id: 2, indo: 'Kamu', ngoko: 'Kowe', krama: 'Panjenengan' },
  { id: 3, indo: 'Makan', ngoko: 'Mangan', krama: 'Dahar' },
  { id: 4, indo: 'Minum', ngoko: 'Ngonbe', krama: 'Ngunjuk' },
  { id: 5, indo: 'Tidur', ngoko: 'Turu', krama: 'Sare' },
  { id: 6, indo: 'Pergi', ngoko: 'Lunga', krama: 'Tindak' },
  { id: 7, indo: 'Datang', ngoko: 'Teka', krama: 'Rawuh' },
  { id: 8, indo: 'Iya', ngoko: 'Iyo', krama: 'Inggih' },
  { id: 9, indo: 'Tidak', ngoko: 'Ora', krama: 'Mboten' },
  { id: 10, indo: 'Berapa', ngoko: 'Piro', krama: 'Pinten' },
];

const MATERIALS = [
  {
    id: 'ngoko_1',
    category: 'Ngoko Dasar',
    title: 'Sapaan Sehari-hari',
    content: [
      { jawa: 'Sugeng enjing', indo: 'Selamat pagi' },
      { jawa: 'Piye kabare?', indo: 'Bagaimana kabarnya?' },
      { jawa: 'Aku apik-apik wae', indo: 'Saya baik-baik saja' },
    ]
  },
  {
    id: 'ngoko_2',
    category: 'Ngoko Dasar',
    title: 'Kata Kerja & Aktivitas',
    content: [
      { jawa: 'Aku lagi mangan', indo: 'Saya sedang makan' },
      { jawa: 'Kowe arep menyang ngendi?', indo: 'Kamu mau pergi ke mana?' },
    ]
  },
  {
    id: 'krama_1',
    category: 'Krama Dasar',
    title: 'Perkenalan Diri',
    content: [
      { jawa: 'Nami kula Budi', indo: 'Nama saya Budi' },
      { jawa: 'Kula saking Jakarta', indo: 'Saya dari Jakarta' },
    ]
  }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Apa bahasa Jawa Ngoko dari "Makan"?',
    options: ['Turu', 'Mangan', 'Lunga', 'Ngonbe'],
    answer: 'Mangan',
    explanation: '"Mangan" adalah bahasa Ngoko, sedangkan kramanya adalah "Dahar".'
  },
  {
    id: 2,
    question: 'Lengkapi kalimat berikut: "Aku lagi ... sega" (Saya sedang makan nasi)',
    options: ['Turu', 'Adus', 'Mangan', 'Mlayu'],
    answer: 'Mangan',
    explanation: 'Sega (nasi) berkaitan dengan aktivitas makan (mangan).'
  },
  {
    id: 3,
    question: 'Jika seseorang bertanya "Piye kabare?", balasan yang tepat adalah...',
    options: ['Aku apik-apik wae', 'Aku arep turu', 'Regane piro?', 'Mboten ngertos'],
    answer: 'Aku apik-apik wae',
    explanation: '"Piye kabare?" artinya "Bagaimana kabarnya?". Balasan yang tepat adalah menyatakan keadaan baik.'
  },
  {
    id: 4,
    question: 'Bahasa Krama dari "Saya" adalah...',
    options: ['Aku', 'Kowe', 'Kula', 'Panjenengan'],
    answer: 'Kula',
    explanation: '"Kula" digunakan untuk menunjuk diri sendiri dalam bahasa halus (Krama).'
  },
  {
    id: 5,
    question: 'Apa arti dari kata "Sugeng enjing"?',
    options: ['Selamat malam', 'Selamat pagi', 'Terima kasih', 'Sama-sama'],
    answer: 'Selamat pagi',
    explanation: 'Sugeng = Selamat, Enjing = Pagi.'
  }
];

// --- MAIN COMPONENT ---

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // User State
  const [userData, setUserData] = useState({
    xp: 0,
    streak: 1,
    level: 1,
    badge: 'Pemula'
  });

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    setUser({ name: e.target.email.value.split('@')[0], email: e.target.email.value });
    setActiveTab('home');
  };

  // Update Badge based on XP
  useEffect(() => {
    let newBadge = 'Pemula';
    if (userData.xp >= 1000) newBadge = 'Wong Jowo Sejati';
    else if (userData.xp >= 500) newBadge = 'Wong Jowo Luwes';
    
    if (newBadge !== userData.badge) {
      setUserData(prev => ({ ...prev, badge: newBadge }));
    }
  }, [userData.xp, userData.badge]);

  // If not logged in, show login screen
  if (!user) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4 font-sans text-amber-900">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-amber-200">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-amber-800 mb-2 font-serif">JawaRantau</h1>
            <p className="text-amber-600">Belajar Basa Jawa makin asik & gampang!</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email" 
                name="email"
                required
                defaultValue="rantau@gmail.com"
                className="w-full px-4 py-2 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-orange-50/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input 
                type="password" 
                name="password"
                required
                defaultValue="password123"
                className="w-full px-4 py-2 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-orange-50/50"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 rounded-lg transition-colors shadow-md mt-4"
            >
              Mlebu (Masuk)
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- SUB-COMPONENTS (VIEWS) ---

  const HomeView = () => (
    <div className="p-4 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Profile Summary */}
      <div className="bg-gradient-to-r from-amber-700 to-amber-900 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
        {/* Batik pattern overlay simulation */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
        
        <div className="relative z-10 flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">Sugeng Rawuh,</h2>
            <p className="text-amber-200 text-lg capitalize">{user.name}</p>
          </div>
          <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
            <Trophy className="w-8 h-8 text-amber-300" />
          </div>
        </div>
        
        <div className="flex bg-black/20 rounded-xl p-3 backdrop-blur-sm divide-x divide-amber-600/50">
          <div className="flex-1 text-center">
            <p className="text-xs text-amber-200 uppercase tracking-wider">Level</p>
            <p className="font-bold text-xl">{userData.level}</p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-xs text-amber-200 uppercase tracking-wider">XP</p>
            <p className="font-bold text-xl">{userData.xp}</p>
          </div>
          <div className="flex-1 text-center flex flex-col items-center justify-center">
            <p className="text-xs text-amber-200 uppercase tracking-wider">Streak</p>
            <div className="flex items-center gap-1">
              <Flame className="w-4 h-4 text-orange-400" />
              <p className="font-bold text-xl">{userData.streak}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => setActiveTab('materi')}
          className="bg-white p-4 rounded-2xl shadow-sm border border-amber-100 flex flex-col items-center justify-center gap-3 hover:bg-amber-50 transition-colors"
        >
          <div className="bg-amber-100 p-4 rounded-full text-amber-700">
            <BookOpen className="w-8 h-8" />
          </div>
          <span className="font-bold text-amber-900">Materi Belajar</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('quiz')}
          className="bg-white p-4 rounded-2xl shadow-sm border border-amber-100 flex flex-col items-center justify-center gap-3 hover:bg-amber-50 transition-colors"
        >
          <div className="bg-orange-100 p-4 rounded-full text-orange-600">
            <Gamepad2 className="w-8 h-8" />
          </div>
          <span className="font-bold text-amber-900">Kuis Harian</span>
        </button>
      </div>

      {/* Recommended Material */}
      <div>
        <h3 className="font-bold text-lg text-amber-900 mb-3">Lanjut Belajar</h3>
        <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-4 flex items-center justify-between cursor-pointer hover:bg-amber-50" onClick={() => setActiveTab('materi')}>
          <div>
            <p className="text-sm text-amber-600 font-medium">Ngoko Dasar</p>
            <p className="font-bold text-amber-900">Sapaan Sehari-hari</p>
          </div>
          <ChevronRight className="text-amber-400" />
        </div>
      </div>
    </div>
  );

  const MateriView = () => (
    <div className="p-4 space-y-6 animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-amber-900 font-serif border-b-2 border-amber-200 pb-2">Materi Bahasa</h2>
      
      <div className="space-y-4">
        {MATERIALS.map((mat) => (
          <div key={mat.id} className="bg-white rounded-xl shadow-sm border border-amber-200 overflow-hidden">
            <div className="bg-amber-100 px-4 py-2 border-b border-amber-200">
              <span className="text-xs font-bold text-amber-800 uppercase">{mat.category}</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg text-amber-900 mb-3">{mat.title}</h3>
              <div className="space-y-3">
                {mat.content.map((item, idx) => (
                  <div key={idx} className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                    <p className="font-bold text-amber-900">{item.jawa}</p>
                    <p className="text-sm text-amber-700 italic">"{item.indo}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const DictionaryView = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [mode, setMode] = useState('indo-jawa'); // 'indo-jawa' or 'jawa-indo'

    const filteredDict = DICTIONARY.filter(item => {
      const term = searchTerm.toLowerCase();
      if (mode === 'indo-jawa') return item.indo.toLowerCase().includes(term);
      return item.ngoko.toLowerCase().includes(term) || item.krama.toLowerCase().includes(term);
    });

    return (
      <div className="p-4 flex flex-col h-full animate-in fade-in duration-300">
        <h2 className="text-2xl font-bold text-amber-900 font-serif mb-4 border-b-2 border-amber-200 pb-2">Kamus Bausastra</h2>
        
        {/* Search & Toggle */}
        <div className="mb-4 space-y-3 sticky top-0 bg-orange-50 pt-2 pb-2 z-10">
          <div className="flex bg-amber-200 p-1 rounded-lg">
            <button 
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${mode === 'indo-jawa' ? 'bg-amber-700 text-white shadow' : 'text-amber-900 hover:bg-amber-300'}`}
              onClick={() => setMode('indo-jawa')}
            >
              Indo → Jawa
            </button>
            <button 
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${mode === 'jawa-indo' ? 'bg-amber-700 text-white shadow' : 'text-amber-900 hover:bg-amber-300'}`}
              onClick={() => setMode('jawa-indo')}
            >
              Jawa → Indo
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 w-5 h-5" />
            <input 
              type="text"
              placeholder="Cari kata..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
            />
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto pb-20 space-y-2">
          {filteredDict.length > 0 ? (
            filteredDict.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-amber-100 flex flex-col">
                <span className="text-sm text-gray-500 mb-1">{mode === 'indo-jawa' ? 'Bahasa Indonesia' : 'Bahasa Jawa'}</span>
                <span className="font-bold text-lg text-amber-900 mb-2">
                  {mode === 'indo-jawa' ? item.indo : `${item.ngoko} / ${item.krama}`}
                </span>
                
                <div className="bg-amber-50 rounded-lg p-2 flex flex-col gap-1 border border-amber-100">
                  <span className="text-xs font-bold text-amber-700 uppercase">{mode === 'indo-jawa' ? 'Terjemahan Jawa:' : 'Arti Indonesia:'}</span>
                  {mode === 'indo-jawa' ? (
                    <>
                      <div className="flex justify-between"><span className="text-sm">Ngoko:</span> <span className="font-bold">{item.ngoko}</span></div>
                      <div className="flex justify-between"><span className="text-sm">Krama:</span> <span className="font-bold">{item.krama}</span></div>
                    </>
                  ) : (
                    <span className="font-bold">{item.indo}</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-amber-600 py-10">Kata tidak ditemukan.</div>
          )}
        </div>
      </div>
    );
  };

  const QuizView = () => {
    const [currentQ, setCurrentQ] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [results, setResults] = useState([]); // Store correct/wrong for each q

    const handleAnswer = (option) => {
      if (isAnswered) return;
      
      setSelectedAnswer(option);
      setIsAnswered(true);
      
      const isCorrect = option === QUIZ_QUESTIONS[currentQ].answer;
      if (isCorrect) setScore(score + 10);
      
      setResults([...results, { q: QUIZ_QUESTIONS[currentQ], selected: option, isCorrect }]);
    };

    const nextQuestion = () => {
      if (currentQ < QUIZ_QUESTIONS.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        finishQuiz();
      }
    };

    const finishQuiz = () => {
      setQuizFinished(true);
      const passScore = (QUIZ_QUESTIONS.length * 10) * 0.8; // 80% to pass
      const passed = score >= passScore;
      
      // Update global user data
      setUserData(prev => ({
        ...prev,
        xp: prev.xp + score,
        streak: passed ? prev.streak + 1 : prev.streak, // Simplified streak logic
        level: passed ? prev.level + 1 : prev.level
      }));
    };

    const restartQuiz = () => {
      setCurrentQ(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setScore(0);
      setQuizFinished(false);
      setResults([]);
    };

    if (quizFinished) {
      const maxScore = QUIZ_QUESTIONS.length * 10;
      const passed = score >= (maxScore * 0.8);

      return (
        <div className="p-4 space-y-6 animate-in zoom-in duration-300">
          <div className={`p-6 rounded-2xl text-center shadow-lg border ${passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            {passed ? <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" /> : <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />}
            <h2 className={`text-2xl font-bold mb-2 ${passed ? 'text-green-800' : 'text-red-800'}`}>
              {passed ? 'Luar Biasa!' : 'Coba Lagi Yuk!'}
            </h2>
            <p className="text-gray-600 mb-4">Skor kamu: <span className="font-bold text-xl">{score}/{maxScore} XP</span></p>
            {passed && <p className="text-sm font-bold text-amber-600 mb-4">+ Level Up & Streak terjaga!</p>}
            
            <button 
              onClick={() => setActiveTab('home')}
              className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 rounded-lg transition-colors mb-2"
            >
              Kembali ke Beranda
            </button>
            {!passed && (
              <button onClick={restartQuiz} className="w-full bg-white text-amber-700 border border-amber-700 font-bold py-3 rounded-lg">
                Ulangi Kuis
              </button>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg text-amber-900 border-b border-amber-200 pb-2">Pembahasan</h3>
            {results.map((res, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-amber-100">
                <div className="flex gap-2 mb-2">
                  {res.isCorrect ? <CheckCircle2 className="text-green-500 shrink-0" /> : <XCircle className="text-red-500 shrink-0" />}
                  <p className="font-medium text-gray-800 text-sm">{res.q.question}</p>
                </div>
                <div className="ml-8 text-sm space-y-2">
                  <p>Jawabanmu: <span className={res.isCorrect ? 'text-green-600 font-bold' : 'text-red-600 line-through'}>{res.selected}</span></p>
                  {!res.isCorrect && <p>Jawaban Benar: <span className="text-green-600 font-bold">{res.q.answer}</span></p>}
                  <div className="bg-blue-50 p-2 rounded text-blue-800 mt-2 text-xs">
                    <strong>Penjelasan:</strong> {res.q.explanation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    const q = QUIZ_QUESTIONS[currentQ];

    return (
      <div className="p-4 flex flex-col h-full">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm font-bold text-amber-800 mb-2">
            <span>Soal {currentQ + 1} dari {QUIZ_QUESTIONS.length}</span>
            <span>{score} XP</span>
          </div>
          <div className="w-full bg-amber-200 rounded-full h-2.5">
            <div className="bg-amber-700 h-2.5 rounded-full transition-all duration-300" style={{ width: `${((currentQ) / QUIZ_QUESTIONS.length) * 100}%` }}></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-amber-200 mb-6 text-center min-h-[150px] flex items-center justify-center">
          <h2 className="text-xl font-bold text-amber-900 leading-relaxed">{q.question}</h2>
        </div>

        {/* Options */}
        <div className="space-y-3 flex-1">
          {q.options.map((option, idx) => {
            let btnClass = "w-full text-left p-4 rounded-xl border-2 font-medium transition-all duration-200 ";
            
            if (!isAnswered) {
              btnClass += "border-amber-200 bg-white text-amber-900 hover:bg-amber-50 hover:border-amber-400";
            } else {
              if (option === q.answer) {
                btnClass += "border-green-500 bg-green-50 text-green-800"; // Correct answer is always highlighted
              } else if (option === selectedAnswer) {
                btnClass += "border-red-500 bg-red-50 text-red-800"; // Wrong selected answer
              } else {
                btnClass += "border-gray-200 bg-gray-50 text-gray-400 opacity-50"; // Other options faded
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleAnswer(option)}
                className={btnClass}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* Explanation & Next Button Container */}
        <div className={`transition-all duration-300 ease-in-out ${isAnswered ? 'opacity-100 translate-y-0 mt-6' : 'opacity-0 translate-y-4 pointer-events-none absolute'}`}>
          {isAnswered && (
             <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-4">
               <h4 className="font-bold text-blue-900 mb-1 text-sm">Pembahasan:</h4>
               <p className="text-sm text-blue-800">{q.explanation}</p>
             </div>
          )}
          <button 
            onClick={nextQuestion}
            className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-4 rounded-xl shadow-lg flex justify-center items-center gap-2"
          >
            {currentQ < QUIZ_QUESTIONS.length - 1 ? 'Soal Selanjutnya' : 'Lihat Hasil'} <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  const ProfileView = () => (
    <div className="p-4 space-y-6 animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-amber-900 font-serif border-b-2 border-amber-200 pb-2">Profil Kula</h2>
      
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-200 text-center relative">
        <div className="w-24 h-24 bg-amber-100 rounded-full mx-auto mb-4 border-4 border-amber-300 flex items-center justify-center">
          <User className="w-12 h-12 text-amber-600" />
        </div>
        <h3 className="text-xl font-bold text-amber-900 capitalize">{user.name}</h3>
        <p className="text-gray-500 text-sm mb-4">{user.email}</p>
        
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1.5 rounded-full font-bold shadow-sm">
          <Trophy className="w-4 h-4" /> {userData.badge}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-amber-200">
        <h4 className="font-bold text-amber-900 mb-4 border-b border-amber-100 pb-2">Statistik Belajar</h4>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Total XP</span>
              <span className="font-bold text-amber-800">{userData.xp} / 1000</span>
            </div>
            <div className="w-full bg-amber-100 rounded-full h-2">
              <div className="bg-amber-600 h-2 rounded-full" style={{ width: `${Math.min((userData.xp / 1000) * 100, 100)}%` }}></div>
            </div>
            <p className="text-xs text-gray-400 mt-1 text-right">Mencapai Wong Jowo Sejati</p>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg"><Flame className="w-5 h-5 text-orange-500" /></div>
              <span className="font-medium text-gray-700">Streak Harian</span>
            </div>
            <span className="font-bold text-lg text-amber-900">{userData.streak} Hari</span>
          </div>

          <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-lg"><BookOpen className="w-5 h-5 text-amber-600" /></div>
              <span className="font-medium text-gray-700">Level Saat Ini</span>
            </div>
            <span className="font-bold text-lg text-amber-900">Level {userData.level}</span>
          </div>
        </div>
      </div>

      <button 
        onClick={() => { setUser(null); setActiveTab('home'); }}
        className="w-full bg-red-50 text-red-600 font-bold py-3 rounded-xl border border-red-200 flex items-center justify-center gap-2 hover:bg-red-100"
      >
        <LogOut className="w-5 h-5" /> Metu (Logout)
      </button>
    </div>
  );

  // --- RENDER LAYOUT ---
  return (
    <div className="min-h-screen bg-orange-50 font-sans text-stone-800 flex justify-center">
      {/* Mobile container constraint for web view */}
      <div className="w-full max-w-md bg-[#faf7f2] min-h-screen flex flex-col relative shadow-2xl">
        
        {/* Top Navbar */}
        <header className="bg-amber-800 text-white p-4 sticky top-0 z-20 shadow-md flex justify-between items-center">
          <h1 className="text-xl font-bold font-serif tracking-wide">JawaRantau</h1>
          <button 
            onClick={() => setIsMusicPlaying(!isMusicPlaying)}
            className={`p-2 rounded-full transition-colors ${isMusicPlaying ? 'bg-amber-600' : 'bg-amber-900 hover:bg-amber-700'}`}
            title="Toggle Gamelan Backsound"
          >
            {isMusicPlaying ? <Music className="w-5 h-5 animate-pulse" /> : <Music4 className="w-5 h-5 opacity-70" />}
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pb-24 relative">
           {/* Decorative background overlay */}
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-amber-100/50 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            {activeTab === 'home' && <HomeView />}
            {activeTab === 'materi' && <MateriView />}
            {activeTab === 'kamus' && <DictionaryView />}
            {activeTab === 'quiz' && <QuizView />}
            {activeTab === 'profile' && <ProfileView />}
          </div>
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-amber-200 flex justify-around p-2 pb-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20 rounded-t-xl">
          <NavItem 
            icon={<BookOpen className="w-6 h-6" />} 
            label="Beranda" 
            isActive={activeTab === 'home'} 
            onClick={() => setActiveTab('home')} 
          />
          <NavItem 
            icon={<Search className="w-6 h-6" />} 
            label="Kamus" 
            isActive={activeTab === 'kamus'} 
            onClick={() => setActiveTab('kamus')} 
          />
          <div className="relative -top-5">
            <button 
              onClick={() => setActiveTab('quiz')}
              className={`bg-amber-700 text-white p-4 rounded-full shadow-lg border-4 border-[#faf7f2] transform transition-transform ${activeTab === 'quiz' ? 'scale-110 bg-amber-800' : 'hover:scale-105'}`}
            >
              <Gamepad2 className="w-7 h-7" />
            </button>
          </div>
          <NavItem 
            icon={<BookOpen className="w-6 h-6" />} 
            label="Materi" 
            isActive={activeTab === 'materi'} 
            onClick={() => setActiveTab('materi')} 
          />
          <NavItem 
            icon={<User className="w-6 h-6" />} 
            label="Profil" 
            isActive={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')} 
          />
        </nav>
      </div>
    </div>
  );
}

// Helper component for bottom nav items
const NavItem = ({ icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-16 gap-1 transition-colors ${isActive ? 'text-amber-800' : 'text-gray-400 hover:text-amber-600'}`}
  >
    <div className={`${isActive ? 'bg-amber-100 p-1.5 rounded-xl' : 'p-1.5'}`}>
      {icon}
    </div>
    <span className={`text-[10px] font-medium ${isActive ? 'font-bold' : ''}`}>{label}</span>
  </button>
);