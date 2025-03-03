type Props = {
  content: string;
  onConfirm: () => void;
  onCloseModal?: () => void;
};

function ConfirmDelete({ content, onConfirm, onCloseModal }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-2xl leading-[30px] font-semibold">Удалить задачу?</h3>
      <p className="overflow-hidden">{content}</p>

      <div className="flex justify-center gap-4">
        <button
          onClick={onConfirm}
          className="border-gray hover:bg-red flex h-[36px] w-full max-w-[202px] items-center justify-center rounded-sm border"
        >
          Удалить
        </button>
        <button
          onClick={onCloseModal}
          className="border-gray hover:bg-secondary flex h-[36px] w-full max-w-[202px] items-center justify-center rounded-sm border"
        >
          Отменить
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
