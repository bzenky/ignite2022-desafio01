import { useContext } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { CopySimple } from 'phosphor-react'
import { ToDoContext } from '../../../contexts/ToDoContext'
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard'
import { dateFormatter } from '../../../utils/formatter'
import { errorDuplicateMessage, successCopiedMessage, successEditMessage } from '../../Toasty'
import { ButtonCopy, Footer, Form, InputWrapper } from './styles'

interface EditProps {
  handleModal: () => void
}

export function Edit({ handleModal }: EditProps) {
  const [value, copy] = useCopyToClipboard()
  const {
    handleUpdateTaskInput,
    handleUpdateTaskList,
    updateTask,
    taskList
  } = useContext(ToDoContext)
  const currentTask = JSON.parse(window.localStorage.getItem('currentTask') || '{}')

  function handleEditTask() {
    event!.preventDefault()

    const verifyContentExists = taskList.filter(task => task.content.trim().toLowerCase() === updateTask.trim().toLowerCase())

    if (verifyContentExists.length >= 1) {
      errorDuplicateMessage()
    } else {
      const lastEditDate = dateFormatter.format(new Date())
      const taskListEditedUpdated = taskList.map(task => task.id === currentTask.id
        ? { ...task, content: updateTask, editedAt: lastEditDate }
        : task
      )
      handleUpdateTaskList(taskListEditedUpdated)
      successEditMessage()
      handleModal()
    }

    handleUpdateTaskInput('')
  }

  function handleCopyTask() {
    event!.preventDefault()
    copy(currentTask.content)
    successCopiedMessage()
  }

  return (
    <>
      <h2>
        Atualize sua tarefa
      </h2>

      <Form onSubmit={handleEditTask}>
        <InputWrapper>
          <label htmlFor="task">Descrição Atual</label>
          <div>
            <input
              value={currentTask.content}
              readOnly
            />

            <ButtonCopy
              type="button"
              onClick={handleCopyTask}
            >
              <CopySimple size={18} color='#D9D9D9' />
            </ButtonCopy>
          </div>

          <label htmlFor="task">Nova Descrição</label>
          <input
            name="task"
            id="task"
            placeholder="Insira a atualização da descrição"
            onChange={(event) => handleUpdateTaskInput(event.target.value)}
            autoFocus
          />
        </InputWrapper>

        <Footer>
          <Dialog.Close asChild>
            <button
              type="button"
              className='cancel'
            >
              Cancelar
            </button>
          </Dialog.Close>

          <button
            type="submit"
            className='submit'
          >
            Atualizar
          </button>
        </Footer>
      </Form>
    </>
  )
}