import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTickets } from '../context/TicketsContext'

export function CreateGroupView() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { createGroup } = useTickets();
  const [formValues, setFormValues] = useState({
    name: searchParams.get('name') || '',
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if(formValues.name.length > 0) {
      createGroup({
        name: formValues.name,
        buddies: []
      }, searchParams.get('name') || undefined)
      navigate('/contacts')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-primary to-blue-900 text-white shadow-md p-4 flex items-center">
        <ChevronLeft className='size-6' onClick={() => navigate(-1)}/>
        <h2 className="text-xl font-bold mx-auto">Create Group</h2>
      </header>
      <main className="container mx-auto px-4 py-6">
        <form className='space-y-4' onSubmit={handleSubmit}>
          <fieldset className='flex flex-col gap-2'>
            <label htmlFor="name" className='block text-sm font-medium text-gray-700'>Name*</label>
            <input
              type="text"
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none'
              id="name"
              name="name"
              value={formValues.name}
              onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
            />
          </fieldset>

          <button
            type="submit"
            className={`w-full flex items-center justify-center px-4 py-2 rounded-md font-medium bg-primary text-white hover:bg-blue-900 transition-colors`}
          >
            Create
          </button>
        </form>
      </main>
    </div>
  )
}