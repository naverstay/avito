import Accordion from 'components/UI/Accordion/Accordion';
import Plate from 'components/UI/Plate/Plate';
import './Answers.scss';

export default function Answers() {
  const questions = [
    {
      title: 'Как SEO может экономить на рекламе в Авито?',
      text: `
        <p>Как и многие сервисы Авито использует динамическую выдачу по поисковым запросам и орентируется на поведенческие факторы.</p>
        <p>Объявления на которых пользователи дольше задерживаются, а так же вызывают больший интерес (например за счет добавления в избранное или подписки) могут более медленно опускать в поисковой выдаче по сравнению с другими объявлениями, которые имеют более плохие поведенческие факторы.</p>
        <br>
        <p>Этот фактор позволяет дольше находится на высоких позициях и не покупать платную рекламу не теряя в просмотрах объявления.</p>
      `
    },
    {
      title: 'Как работают алгоритмы Авито?',
      text: `
        <p>Задача поисковой выдачи Авито – дать пользователю максимально полезную для него информацию, которая поможет ему реализовать его потребность – найти подходящее для сделки предложение.</p>
        <p>Важно не просто найти все объявления, которые подходят под поисковый запрос пользователя, но упорядочить объявления таким образом, чтобы покупателю было удобно делать выбор среди всех предложений. Это обеспечивает механизм ранжирования объявлений на Авито.</p>
        <br>
        <p>Релевантность объявления поисковому запросу обуславливается совпадением интересов пользователей по ключевым параметрам: размещение и поиск в правильной категории и регионе, подходящий заголовок объявления, заполнение продавцом обязательных и дополнительных параметров объявления, которые покупатель задает в поиске или фильтрует на выдаче, дата публикации объявления, прочие метрики, позволяющие сделать подборку именно тех объявлений, которые по прогнозу системы ранжирования будут наиболее интересны покупателю.</p>
        <br>
        <p>Основные факторы влияющие на релевантность выдачи:</p>
        <ol>
        <li>Привлекательность предложения</li>
        <li>Качество объявлений</li>
        <li>Конкуренция</li>
        <li>Доверие</li>
        </ol>
      `
    },
    {
      title: 'Как оптимизировать карточку объявления?',
      text: `
        <p>Четкие описания, наличие полной информации, качественные фотографии от 11 шт + 1 видео, отсутствие рекламных текстов и нерелевантных призывов в описании, прозрачные и понятные условия сделки в описании, честная информация о товаре в объявлении – все это вызывает спрос и доверие покупателей, поэтому более качественные объявления, соответствующие правилам Авито, могут получить больше просмотров пользователей и быть выше в поиске.</p>
        <p>Именно поэтому Авито уделяет большое внимание правилам размещения объявлений, подробно описывая порядок заполнения тех или иных параметров, чтобы автоматические алгоритмы сайта могли распознать качественные объявления, а у продавцов было больше инструментов, помогающих в достижении их цели – получение внимания заинтересованного покупателя и совершение сделки на Авито.</p>
        <br>
        <p>Рекомендуется использовать не более 4 разных поисковых запроса и не более 3х вхождений по  каждому на описание 1500 символов.</p>
        <p>Используйти дополнительную выгоду для покупателей на Авито и матевируйте их писать вам в чат.</p>
      `
    },
    {
      title: 'Как подобрать поисковые запросы?',
      text: `
        <p>При подборе поисковых запросов важно учитывать частотность поисковых запросов. Для этого подойдет сервис wordstat.yandex.ru, Авито PRO.</p>
        <br>
        <p>Подробнее в WIKI</p>
      `
    },
    {
      title: 'Как составить SEO текст объявления?',
      text: `
        <p>Написание эффективных рекламных объявлений для площадки Avito может быть достигнуто с помощью органичного использования ключевых слов в тексте.</p>
        <p>Ключевые слова должны быть естественно вписаны в текст объявления и помочь людям найти нужный товар или услугу.</p>
        <p>Также важно указывать точный адрес и характеристики товара или услуги в структурированном виде.</p>
        <p>Важно не просто добавлять множество тегов в описание, а помогать потенциальным покупателям решить свою конкретную потребность.</p>
        <br>
        <p>Подробнее в WIKI</p>
      `
    },
    {
      title: 'Как работает автоматическая стратегия SEO продвижения Boostclick?',
      text: `
        <p>Сервис используют накопленные исторические данные, анализирует конкурентов в выбранной категории и автоматически подбирает и распределяет активности.</p>
      `
    },
    {
      title: 'Как работает ручная стратегия SEO продвижения Boostclick?',
      text: `
        <p>Ручная стратегия может подойти для опытных пользователей Авито, которые хорошо понимают свою категорию и знают особенности алгоритмов Авито.</p>
        <p>Данная стратегия может быть более эффективной (по сравнения с автоматической стратегией) в узких малопопулярных категориях.</p>
      `
    },
    {
      title: 'Какие есть гарантии?',
      text: `
        <p>Сервис гарантирует размещения активностей в полном объеме, результаты можно видеть в карточке объявления и в отчетах сервиса.</p>
        <p>Сервис не несет ответственности и не гарантирует 100% продвижение по запросам, тк не может влиять на:</p>
        <ol>
        <li>На качество фотографий в объявления</li>
        <li>На подбор поисковых запросов</li>
        <li>На состовление тектов объявления</li>
        <li>На SEO оптемизацию текста объявления</li>
        <li>На конкуренцию в категории</li>
        <li>На ценовую политику объявления</li>
        </ol>
        <p>Если вам нужна помощь с оптимизацией, то вы можете обратиться к партнеру <a href="https://aggo.ru/avito/" target="_blank">https://aggo.ru/avito/</a></p>
      `
    },
    {
      title: 'Почему я могу не увидеть свое объявление после продвижения?',
      text: `
        <p>Есть несколько причин по которым объявление на Авито вы можете не увидить в поиске.</p>
        <ol>
        <li>Не прошло достаточно времени для модерации</li>
        <li>Индивидуальная выдача Авито, необходимо проверить в браузере через инкогнито</li>
        <li>Неправильный раздел или категория</li>
        <li>Неправильные ключевые слова</li>
        <li>Конкуренция</li>
        <li>Ограничение региона</li>
        <li>Удаление объявления</li>
        </ol>
        <p>Подробнее в WIKI</p>
      `
    },
    {
      title: 'Как оплатить продвижение?',
      text: `
        <p>Оплата производится или через сервис Robokassa или через безналичный расчет по договору оферты</p>
      `
    },
    {
      title: 'Другие вопросы?',
      text: `
        <p>По техническим вопросам можно отправить заявку на <a href="mailto:help@boostclick.ru">help@boostclick.ru</a></p>
      `
    }
  ];

  const plateStyle = {
    marginBottom: '60px',
    padding: '30px 60px',
    width: '100%'
  };

  return (
    <section className="answers" id="answers">
      <div className="answers__inner">
        <h2 className="answers__title">FAQ</h2>

        <Plate style={plateStyle}>
          {questions.map((i, ind) => (
            <Accordion title={i.title} text={i.text} key={ind}/>
          ))}
        </Plate>

        <Plate style={plateStyle}>
          <Accordion title="Другие предложения по кредитным картам" text="Другие предложения по кредитным картам Другие предложения по кредитным картам"/>
        </Plate>
      </div>
    </section>
  );
}
