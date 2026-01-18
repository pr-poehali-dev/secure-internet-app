import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

type Screen = 'intro' | 'passwords' | 'behavior' | 'phishing' | 'data' | 'devices' | 'about' | 'quiz';

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('intro');
  const [currentQuiz, setCurrentQuiz] = useState<Screen | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [selectedBehavior, setSelectedBehavior] = useState<number | null>(null);
  const [phishingScore, setPhishingScore] = useState(0);
  const [dataCollected, setDataCollected] = useState<string[]>([]);
  const [deviceProtected, setDeviceProtected] = useState(false);

  const quizData: Record<Screen, QuizQuestion[]> = {
    passwords: [
      {
        question: 'Какой пароль самый надёжный?',
        options: ['12345', 'qwerty', 'M@x!m2024#Qw', 'password'],
        correct: 2
      },
      {
        question: 'Как часто нужно менять пароли?',
        options: ['Никогда', 'Каждые 3-6 месяцев', 'Каждый день', 'Раз в 10 лет'],
        correct: 1
      }
    ],
    behavior: [
      {
        question: 'Что делать, если незнакомец пишет тебе в соцсетях?',
        options: ['Ответить и рассказать всё о себе', 'Проигнорировать или рассказать родителям', 'Отправить свой адрес', 'Встретиться с ним'],
        correct: 1
      },
      {
        question: 'Можно ли публиковать фото из школы с адресом?',
        options: ['Да, все так делают', 'Нет, это опасно', 'Только если красивое фото', 'Можно, но только друзьям'],
        correct: 1
      }
    ],
    phishing: [
      {
        question: 'Как распознать фишинговое письмо?',
        options: ['Просят срочно ввести пароль по ссылке', 'От знакомой компании', 'Красиво оформлено', 'Пришло на почту'],
        correct: 0
      },
      {
        question: 'Что делать с подозрительной ссылкой?',
        options: ['Кликнуть и посмотреть', 'Отправить другу', 'Не кликать и удалить', 'Скопировать пароль'],
        correct: 2
      }
    ],
    data: [
      {
        question: 'Какие данные НЕЛЬЗЯ публиковать в интернете?',
        options: ['Домашний адрес и номер телефона', 'Любимый цвет', 'Хобби', 'Любимая книга'],
        correct: 0
      },
      {
        question: 'Что безопасно рассказать в интернете?',
        options: ['Номер банковской карты родителей', 'Когда родителей нет дома', 'Любимую музыку', 'Пароль от телефона'],
        correct: 2
      }
    ],
    devices: [
      {
        question: 'Зачем нужен антивирус?',
        options: ['Чтобы телефон быстрее работал', 'Чтобы защитить от вирусов и вредоносных программ', 'Чтобы играть в игры', 'Чтобы экономить батарею'],
        correct: 1
      },
      {
        question: 'Как часто нужно обновлять приложения?',
        options: ['Никогда', 'Регулярно, когда доступны обновления', 'Раз в год', 'Только когда телефон сломается'],
        correct: 1
      }
    ],
    intro: [],
    about: [],
    quiz: []
  };

  const startQuiz = (screen: Screen) => {
    setCurrentQuiz(screen);
    setQuizAnswers([]);
    setQuizComplete(false);
  };

  const answerQuiz = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);

    if (currentQuiz && newAnswers.length === quizData[currentQuiz].length) {
      setQuizComplete(true);
    }
  };

  const getQuizScore = () => {
    if (!currentQuiz) return 0;
    const questions = quizData[currentQuiz];
    let correct = 0;
    quizAnswers.forEach((answer, index) => {
      if (answer === questions[index].correct) correct++;
    });
    return Math.round((correct / questions.length) * 100);
  };

  const renderIntro = () => (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 text-center space-y-6 animate-scale-in">
        <div className="text-6xl animate-bounce-gentle">🛡️</div>
        <h1 className="text-4xl md:text-5xl font-bold text-primary">Безопасный Интернет</h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Привет! Я помогу тебе стать настоящим экспертом по безопасности в интернете! 🚀
        </p>
        <div className="space-y-3">
          <p className="text-base">В этом приложении ты научишься:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 bg-primary/10 p-3 rounded-lg">
              <Icon name="Lock" className="text-primary" size={20} />
              <span>Создавать надёжные пароли</span>
            </div>
            <div className="flex items-center gap-2 bg-secondary/10 p-3 rounded-lg">
              <Icon name="Users" className="text-secondary" size={20} />
              <span>Безопасно общаться</span>
            </div>
            <div className="flex items-center gap-2 bg-accent/10 p-3 rounded-lg">
              <Icon name="Mail" className="text-accent" size={20} />
              <span>Распознавать мошенников</span>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 p-3 rounded-lg">
              <Icon name="Shield" className="text-primary" size={20} />
              <span>Защищать свои данные</span>
            </div>
          </div>
        </div>
        <Button onClick={() => setCurrentScreen('passwords')} size="lg" className="text-lg px-8">
          Начать обучение! <Icon name="ArrowRight" className="ml-2" size={20} />
        </Button>
      </Card>
    </div>
  );

  const renderPasswords = () => (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-primary/30 p-4 md:p-8">
      <Card className="max-w-3xl mx-auto p-6 md:p-8 space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="text-4xl">🔐</div>
          <h2 className="text-3xl font-bold text-primary">Пароли и учётные записи</h2>
        </div>
        
        <p className="text-lg">Пароль — это ключ от твоей учётной записи. Давай создадим надёжный пароль!</p>
        
        <div className="space-y-4 bg-muted/50 p-6 rounded-lg">
          <h3 className="font-semibold text-xl">🎮 Мини-игра: Создай супер-пароль</h3>
          <p className="text-sm text-muted-foreground">Выбери правильные элементы для создания надёжного пароля:</p>
          
          <div className="grid grid-cols-2 gap-3">
            {[
              { text: 'Заглавные буквы (A-Z)', points: 25, icon: '🔤' },
              { text: 'Строчные буквы (a-z)', points: 25, icon: '🔡' },
              { text: 'Цифры (0-9)', points: 25, icon: '🔢' },
              { text: 'Символы (@#$%)', points: 25, icon: '🎯' }
            ].map((item, idx) => (
              <Button
                key={idx}
                variant={passwordStrength >= (idx + 1) * 25 ? 'default' : 'outline'}
                onClick={() => setPasswordStrength(Math.min(100, passwordStrength + item.points))}
                className="h-auto py-4 flex flex-col items-center gap-2"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs text-center">{item.text}</span>
              </Button>
            ))}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Надёжность пароля:</span>
              <span className="font-bold">{passwordStrength}%</span>
            </div>
            <Progress value={passwordStrength} className="h-3" />
          </div>
          
          {passwordStrength === 100 && (
            <div className="bg-primary/10 border-2 border-primary p-4 rounded-lg text-center animate-scale-in">
              <p className="font-bold text-primary">🎉 Отлично! Твой пароль супер-надёжный!</p>
            </div>
          )}
        </div>

        <div className="bg-accent/10 p-4 rounded-lg space-y-2">
          <h4 className="font-semibold flex items-center gap-2">
            <Icon name="Lightbulb" className="text-accent" size={20} />
            Важные правила:
          </h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Никогда не используй своё имя или дату рождения</li>
            <li>Не используй одинаковый пароль везде</li>
            <li>Никому не рассказывай свой пароль</li>
          </ul>
        </div>

        <div className="flex gap-3 justify-between">
          <Button variant="outline" onClick={() => setCurrentScreen('intro')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" /> Назад
          </Button>
          <Button onClick={() => startQuiz('passwords')} className="bg-accent hover:bg-accent/90">
            Пройти викторину <Icon name="Trophy" size={20} className="ml-2" />
          </Button>
          <Button onClick={() => setCurrentScreen('behavior')}>
            Далее <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderBehavior = () => (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 to-secondary/30 p-4 md:p-8">
      <Card className="max-w-3xl mx-auto p-6 md:p-8 space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="text-4xl">👥</div>
          <h2 className="text-3xl font-bold text-secondary">Безопасное поведение</h2>
        </div>
        
        <p className="text-lg">Интернет — это как настоящий город. Нужно знать правила безопасности!</p>
        
        <div className="space-y-4 bg-muted/50 p-6 rounded-lg">
          <h3 className="font-semibold text-xl">🎯 Выбери правильное действие</h3>
          
          <div className="space-y-4">
            {[
              {
                situation: 'Незнакомец пишет: "Давай встретимся?"',
                safe: 'Сказать родителям и заблокировать',
                danger: 'Согласиться на встречу'
              },
              {
                situation: 'Друг просит пароль от игры',
                safe: 'Вежливо отказать',
                danger: 'Дать пароль другу'
              },
              {
                situation: 'Нашёл подозрительную ссылку',
                safe: 'Не переходить, спросить взрослых',
                danger: 'Сразу кликнуть'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg space-y-3 border-2 border-border">
                <p className="font-semibold">{item.situation}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Button
                    variant={selectedBehavior === idx * 2 ? 'default' : 'outline'}
                    onClick={() => setSelectedBehavior(idx * 2)}
                    className={`h-auto py-3 ${selectedBehavior === idx * 2 ? 'bg-green-500 hover:bg-green-600' : ''}`}
                  >
                    <Icon name="CheckCircle" size={20} className="mr-2" />
                    <span className="text-sm">{item.safe}</span>
                  </Button>
                  <Button
                    variant={selectedBehavior === idx * 2 + 1 ? 'destructive' : 'outline'}
                    onClick={() => setSelectedBehavior(idx * 2 + 1)}
                    className="h-auto py-3"
                  >
                    <Icon name="XCircle" size={20} className="mr-2" />
                    <span className="text-sm">{item.danger}</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 justify-between">
          <Button variant="outline" onClick={() => setCurrentScreen('passwords')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" /> Назад
          </Button>
          <Button onClick={() => startQuiz('behavior')} className="bg-accent hover:bg-accent/90">
            Пройти викторину <Icon name="Trophy" size={20} className="ml-2" />
          </Button>
          <Button onClick={() => setCurrentScreen('phishing')}>
            Далее <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderPhishing = () => (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 to-accent/30 p-4 md:p-8">
      <Card className="max-w-3xl mx-auto p-6 md:p-8 space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="text-4xl">🎣</div>
          <h2 className="text-3xl font-bold text-accent">Фишинг и мошенничество</h2>
        </div>
        
        <p className="text-lg">Мошенники пытаются обмануть людей поддельными сообщениями. Научись их находить!</p>
        
        <div className="space-y-4 bg-muted/50 p-6 rounded-lg">
          <h3 className="font-semibold text-xl">🔍 Найди фишинговые сообщения</h3>
          
          <div className="space-y-3">
            {[
              {
                from: 'info@vk-security-2024.com',
                text: 'СРОЧНО! Ваш аккаунт заблокирован! Перейдите по ссылке и введите пароль!',
                isFake: true
              },
              {
                from: 'noreply@vk.com',
                text: 'Ваш код подтверждения: 123456. Никому не сообщайте этот код.',
                isFake: false
              },
              {
                from: 'winner@lottery-prize.ru',
                text: 'Поздравляем! Вы выиграли iPhone! Отправьте нам данные карты для получения приза!',
                isFake: true
              }
            ].map((msg, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg border-2 border-border cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => {
                  if (msg.isFake) {
                    setPhishingScore(prev => Math.min(100, prev + 34));
                  }
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">От: {msg.from}</p>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  {msg.isFake && (
                    <Icon name="AlertTriangle" className="text-destructive" size={20} />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Найдено фишинговых писем:</span>
              <span className="font-bold">{Math.round(phishingScore)}%</span>
            </div>
            <Progress value={phishingScore} className="h-3" />
          </div>

          {phishingScore >= 68 && (
            <div className="bg-accent/10 border-2 border-accent p-4 rounded-lg text-center animate-scale-in">
              <p className="font-bold text-accent">🎉 Молодец! Ты нашёл все фишинговые письма!</p>
            </div>
          )}
        </div>

        <div className="bg-destructive/10 p-4 rounded-lg space-y-2">
          <h4 className="font-semibold flex items-center gap-2">
            <Icon name="ShieldAlert" className="text-destructive" size={20} />
            Признаки фишинга:
          </h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Подозрительный адрес отправителя</li>
            <li>Требуют срочно ввести пароль или данные карты</li>
            <li>Орфографические ошибки</li>
            <li>Слишком хорошие предложения (призы, выигрыши)</li>
          </ul>
        </div>

        <div className="flex gap-3 justify-between">
          <Button variant="outline" onClick={() => setCurrentScreen('behavior')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" /> Назад
          </Button>
          <Button onClick={() => startQuiz('phishing')} className="bg-accent hover:bg-accent/90">
            Пройти викторину <Icon name="Trophy" size={20} className="ml-2" />
          </Button>
          <Button onClick={() => setCurrentScreen('data')}>
            Далее <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderData = () => (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/20 p-4 md:p-8">
      <Card className="max-w-3xl mx-auto p-6 md:p-8 space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="text-4xl">🔒</div>
          <h2 className="text-3xl font-bold text-primary">Личные данные</h2>
        </div>
        
        <p className="text-lg">Некоторую информацию о себе нужно держать в секрете. Давай разберёмся!</p>
        
        <div className="space-y-4 bg-muted/50 p-6 rounded-lg">
          <h3 className="font-semibold text-xl">🎮 Квест: Собери безопасные данные</h3>
          <p className="text-sm text-muted-foreground">Выбери, какую информацию МОЖНО публиковать:</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { text: 'Любимая книга', safe: true, icon: '📚' },
              { text: 'Домашний адрес', safe: false, icon: '🏠' },
              { text: 'Хобби', safe: true, icon: '🎨' },
              { text: 'Номер телефона', safe: false, icon: '📱' },
              { text: 'Любимая музыка', safe: true, icon: '🎵' },
              { text: 'Пароль', safe: false, icon: '🔑' }
            ].map((item, idx) => (
              <Button
                key={idx}
                variant={dataCollected.includes(item.text) ? (item.safe ? 'default' : 'destructive') : 'outline'}
                onClick={() => {
                  if (item.safe && !dataCollected.includes(item.text)) {
                    setDataCollected([...dataCollected, item.text]);
                  }
                }}
                className="h-auto py-4 flex flex-col items-center gap-2"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs text-center">{item.text}</span>
              </Button>
            ))}
          </div>

          {dataCollected.length === 3 && (
            <div className="bg-primary/10 border-2 border-primary p-4 rounded-lg text-center animate-scale-in">
              <p className="font-bold text-primary">🎉 Отлично! Ты собрал все безопасные данные!</p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 border-2 border-green-500 p-4 rounded-lg space-y-2">
            <h4 className="font-semibold flex items-center gap-2 text-green-700">
              <Icon name="Check" className="text-green-500" size={20} />
              Можно публиковать:
            </h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Хобби и интересы</li>
              <li>Любимые фильмы/книги</li>
              <li>Мнение о публичных событиях</li>
            </ul>
          </div>

          <div className="bg-red-50 border-2 border-red-500 p-4 rounded-lg space-y-2">
            <h4 className="font-semibold flex items-center gap-2 text-red-700">
              <Icon name="X" className="text-red-500" size={20} />
              НЕЛЬЗЯ публиковать:
            </h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Домашний адрес</li>
              <li>Номер телефона</li>
              <li>Данные карт/паспорта</li>
              <li>Пароли</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3 justify-between">
          <Button variant="outline" onClick={() => setCurrentScreen('phishing')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" /> Назад
          </Button>
          <Button onClick={() => startQuiz('data')} className="bg-accent hover:bg-accent/90">
            Пройти викторину <Icon name="Trophy" size={20} className="ml-2" />
          </Button>
          <Button onClick={() => setCurrentScreen('devices')}>
            Далее <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderDevices = () => (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 to-primary/20 p-4 md:p-8">
      <Card className="max-w-3xl mx-auto p-6 md:p-8 space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="text-4xl">🛡️</div>
          <h2 className="text-3xl font-bold text-accent">Защита устройств</h2>
        </div>
        
        <p className="text-lg">Твой телефон или планшет нужно защищать от вирусов и взломов!</p>
        
        <div className="space-y-4 bg-muted/50 p-6 rounded-lg">
          <h3 className="font-semibold text-xl">🎯 Симуляция: Защити устройство</h3>
          
          <div className="bg-white p-6 rounded-lg border-2 border-border text-center">
            <div className={`text-6xl mb-4 transition-all ${deviceProtected ? 'animate-bounce-gentle' : ''}`}>
              {deviceProtected ? '💚' : '📱'}
            </div>
            <p className="text-lg mb-4 font-semibold">
              {deviceProtected ? 'Устройство защищено!' : 'Незащищённое устройство'}
            </p>
            
            {!deviceProtected ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground mb-4">Выполни все действия для защиты:</p>
                <div className="grid gap-3">
                  <Button
                    variant="outline"
                    className="justify-start h-auto py-3"
                    onClick={() => {}}
                  >
                    <Icon name="Shield" size={20} className="mr-2 text-primary" />
                    <span className="text-left">1. Установить антивирус</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start h-auto py-3"
                    onClick={() => {}}
                  >
                    <Icon name="RefreshCw" size={20} className="mr-2 text-secondary" />
                    <span className="text-left">2. Обновить приложения</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start h-auto py-3"
                    onClick={() => setDeviceProtected(true)}
                  >
                    <Icon name="Lock" size={20} className="mr-2 text-accent" />
                    <span className="text-left">3. Включить блокировку экрана</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 border-2 border-green-500 p-4 rounded-lg animate-scale-in">
                <p className="font-bold text-green-700">🎉 Отлично! Твоё устройство теперь в безопасности!</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-primary/10 p-4 rounded-lg space-y-2">
          <h4 className="font-semibold flex items-center gap-2">
            <Icon name="Info" className="text-primary" size={20} />
            Важные советы:
          </h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Всегда устанавливай пароль или отпечаток пальца на телефон</li>
            <li>Обновляй приложения и систему регулярно</li>
            <li>Используй антивирус для проверки файлов</li>
            <li>Не скачивай приложения из неизвестных источников</li>
          </ul>
        </div>

        <div className="flex gap-3 justify-between">
          <Button variant="outline" onClick={() => setCurrentScreen('data')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" /> Назад
          </Button>
          <Button onClick={() => startQuiz('devices')} className="bg-accent hover:bg-accent/90">
            Пройти викторину <Icon name="Trophy" size={20} className="ml-2" />
          </Button>
          <Button onClick={() => setCurrentScreen('about')}>
            Далее <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderAbout = () => (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-4 md:p-8">
      <Card className="max-w-3xl mx-auto p-6 md:p-8 space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="text-4xl">ℹ️</div>
          <h2 className="text-3xl font-bold text-primary">О приложении</h2>
        </div>
        
        <div className="space-y-4">
          <p className="text-lg">
            Сейчас почти у каждого ребенка есть телефон или планшет, и мы много времени проводим в интернете. 
            Мы общаемся в соцсетях, играем в онлайн-игры, смотрим видео.
          </p>
          
          <div className="bg-accent/10 p-4 rounded-lg">
            <p className="font-semibold text-lg mb-2">⚠️ Но интернет может быть не только интересным, но и опасным местом.</p>
            <p>
              Взрослые часто говорят детям «будь осторожен в интернете», но не всегда объясняют, что именно нужно делать.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-xl">📚 Это приложение создано для того, чтобы дети:</h3>
            <div className="grid gap-3">
              <div className="flex items-start gap-3 bg-primary/10 p-4 rounded-lg">
                <Icon name="Check" className="text-primary mt-1" size={20} />
                <span>Узнали правила безопасного поведения в интернете</span>
              </div>
              <div className="flex items-start gap-3 bg-secondary/10 p-4 rounded-lg">
                <Icon name="Check" className="text-secondary mt-1" size={20} />
                <span>Научились создавать надежные пароли</span>
              </div>
              <div className="flex items-start gap-3 bg-accent/10 p-4 rounded-lg">
                <Icon name="Check" className="text-accent mt-1" size={20} />
                <span>Поняли, как распознавать мошенников</span>
              </div>
              <div className="flex items-start gap-3 bg-primary/10 p-4 rounded-lg">
                <Icon name="Check" className="text-primary mt-1" size={20} />
                <span>Узнали, какие личные данные нельзя публиковать</span>
              </div>
              <div className="flex items-start gap-3 bg-secondary/10 p-4 rounded-lg">
                <Icon name="Check" className="text-secondary mt-1" size={20} />
                <span>Смогли защитить свои устройства от вирусов</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-lg text-white text-center">
            <p className="text-xl font-bold mb-2">🌟 Будь безопасным в интернете!</p>
            <p>Помни: ты всегда можешь обратиться к родителям, если что-то кажется подозрительным.</p>
          </div>
        </div>

        <div className="flex gap-3 justify-between">
          <Button variant="outline" onClick={() => setCurrentScreen('devices')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" /> Назад
          </Button>
          <Button onClick={() => setCurrentScreen('intro')} className="bg-primary">
            На главную <Icon name="Home" size={20} className="ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderQuiz = () => {
    if (!currentQuiz) return null;
    const questions = quizData[currentQuiz];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/20 to-accent/20 p-4 md:p-8">
        <Card className="max-w-3xl mx-auto p-6 md:p-8 space-y-6 animate-scale-in">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🏆</div>
            <h2 className="text-3xl font-bold text-primary">Викторина</h2>
          </div>

          {!quizComplete ? (
            <div className="space-y-6">
              {questions.map((q, qIdx) => (
                <div key={qIdx} className="space-y-3">
                  <h3 className="font-semibold text-lg">{qIdx + 1}. {q.question}</h3>
                  <div className="grid gap-2">
                    {q.options.map((option, oIdx) => (
                      <Button
                        key={oIdx}
                        variant={quizAnswers[qIdx] === oIdx ? 'default' : 'outline'}
                        onClick={() => answerQuiz(qIdx, oIdx)}
                        className="justify-start h-auto py-3 text-left"
                      >
                        <span className="mr-2 font-bold">{String.fromCharCode(65 + oIdx)}.</span>
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <Progress value={(quizAnswers.length / questions.length) * 100} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Отвечено: {quizAnswers.length} из {questions.length}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="text-6xl animate-bounce-gentle">
                  {getQuizScore() >= 50 ? '🎉' : '💪'}
                </div>
                <h3 className="text-2xl font-bold">
                  Твой результат: {getQuizScore()}%
                </h3>
                <p className="text-lg">
                  {getQuizScore() === 100 && 'Превосходно! Ты настоящий эксперт!'}
                  {getQuizScore() >= 50 && getQuizScore() < 100 && 'Хорошо! Но можно лучше!'}
                  {getQuizScore() < 50 && 'Попробуй ещё раз!'}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Правильные ответы:</h4>
                {questions.map((q, idx) => (
                  <div key={idx} className="bg-muted/50 p-4 rounded-lg">
                    <p className="font-semibold mb-2">{q.question}</p>
                    <div className="flex items-center gap-2">
                      {quizAnswers[idx] === q.correct ? (
                        <Icon name="CheckCircle" className="text-green-500" size={20} />
                      ) : (
                        <Icon name="XCircle" className="text-red-500" size={20} />
                      )}
                      <span className="text-sm">
                        {q.options[q.correct]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setCurrentQuiz(null);
                    setQuizAnswers([]);
                    setQuizComplete(false);
                  }}
                  className="flex-1"
                >
                  Закрыть викторину
                </Button>
                {getQuizScore() < 100 && (
                  <Button 
                    onClick={() => {
                      setQuizAnswers([]);
                      setQuizComplete(false);
                    }}
                    className="flex-1"
                  >
                    Попробовать снова
                  </Button>
                )}
              </div>
            </div>
          )}
        </Card>
      </div>
    );
  };

  if (currentQuiz) {
    return renderQuiz();
  }

  return (
    <>
      {currentScreen === 'intro' && renderIntro()}
      {currentScreen === 'passwords' && renderPasswords()}
      {currentScreen === 'behavior' && renderBehavior()}
      {currentScreen === 'phishing' && renderPhishing()}
      {currentScreen === 'data' && renderData()}
      {currentScreen === 'devices' && renderDevices()}
      {currentScreen === 'about' && renderAbout()}
    </>
  );
};

export default Index;
