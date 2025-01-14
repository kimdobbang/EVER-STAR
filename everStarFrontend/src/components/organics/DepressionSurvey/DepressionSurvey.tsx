import React, { useState, useMemo } from 'react';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { useUpdatePsychologicalTestResult } from 'hooks/useMemorialBooks';
import { useSelector } from 'react-redux';
import { RootState } from 'store/Store';

interface Question {
  id: number;
  text: string;
  value: number;
}

const questions: Question[] = [
  {
    id: 1,
    text: '일 또는 여가 활동을 하는데 흥미나 즐거움을 느끼지 못함',
    value: 0,
  },
  { id: 2, text: '기분이 가라앉거나 우울하거나 희망이 없음', value: 0 },
  {
    id: 3,
    text: '잠이 들거나 계속 잠을 자는 것이 어려움 또는 잠을 너무 많이 잠',
    value: 0,
  },
  { id: 4, text: '피곤하다고 느끼거나 기운이 거의 없음', value: 0 },
  { id: 5, text: '입맛이 없거나 과식을 함', value: 0 },
  {
    id: 6,
    text: '자신을 부정적으로 봄 – 자신이 실패자라고 느끼거나 자신 또는 가족을 실망시킴',
    value: 0,
  },
  {
    id: 7,
    text: '신문을 읽거나 텔레비전 보는 것과 같은 일에 집중하는 것이 어려움',
    value: 0,
  },
  {
    id: 8,
    text: '다른 사람들이 주목할 정도로 너무 느리게 움직이거나 말을 함 또는 너무 안절부절 못하거나 들떠 있음',
    value: 0,
  },
  {
    id: 9,
    text: '자신이 죽는 것이 더 낫다고 생각하거나 어떤 식으로든 자신을 해칠 것이라고 생각함',
    value: 0,
  },
];

interface DepressionSurveyProps {
  onSubmitSuccess: () => void;
  memorialBookId: number;
}

export const DepressionSurvey: React.FC<DepressionSurveyProps> = ({
  onSubmitSuccess,
  memorialBookId,
}) => {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const petId = useSelector((state: RootState) => state.pet.petDetails?.id);

  const { mutate: updateTestResult } = useUpdatePsychologicalTestResult({
    onSuccess: () => {
      onSubmitSuccess(); // 성공 시 콜백 호출
    },
  });

  const allQuestionsAnswered = useMemo(() => {
    return questions.every((question) =>
      Object.prototype.hasOwnProperty.call(answers, question.id)
    );
  }, [answers]);

  const handleChange = (id: number, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    if (!allQuestionsAnswered) {
      console.error('All questions must be answered before submitting.');
      return;
    }

    const totalScore = Object.values(answers).reduce(
      (acc, curr) => acc + curr,
      0
    );

    if (petId && memorialBookId) {
      updateTestResult({
        petId,
        memorialBookId,
        psychologicalTestResult: totalScore.toString(),
      });
    } else {
      console.error('Missing petId or memorialBookId');
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-full max-w-md p-4 bg-white border border-gray-300 rounded-lg shadow-lg'>
        <h2 className='mb-4 text-lg font-semibold text-center text-gray-800'>
          국립정신건강센터 정서 검사
        </h2>
        <div className='h-64 overflow-auto'>
          <table className='w-full text-sm border-collapse'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='px-1 py-2 text-left'>질문</th>
                <th className='px-1 py-2 text-center'>전혀 아님</th>
                <th className='px-1 py-2 text-center'>며칠 동안</th>
                <th className='px-1 py-2 text-center'>7일 이상</th>
                <th className='px-1 py-2 text-center'>거의 매일</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question) => (
                <tr key={question.id} className='border-b'>
                  <td className='px-2 py-2'>{question.text}</td>
                  <td className='px-2 py-2 text-center'>
                    <input
                      type='radio'
                      name={`question-${question.id}`}
                      value={0}
                      onChange={() => handleChange(question.id, 0)}
                      className='form-radio'
                    />
                  </td>
                  <td className='px-2 py-2 text-center'>
                    <input
                      type='radio'
                      name={`question-${question.id}`}
                      value={1}
                      onChange={() => handleChange(question.id, 1)}
                      className='form-radio'
                    />
                  </td>
                  <td className='px-2 py-2 text-center'>
                    <input
                      type='radio'
                      name={`question-${question.id}`}
                      value={2}
                      onChange={() => handleChange(question.id, 2)}
                      className='form-radio'
                    />
                  </td>
                  <td className='px-2 py-2 text-center'>
                    <input
                      type='radio'
                      name={`question-${question.id}`}
                      value={3}
                      onChange={() => handleChange(question.id, 3)}
                      className='form-radio'
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='flex justify-center mt-4'>
          <PrimaryButton
            theme='white'
            size='medium'
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered} // 모든 질문이 채워지지 않으면 버튼 비활성화
            icon={null}
          >
            제출하기
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
