import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import React from 'react'

const EducationForm = ({ data, onChange }) => {

    const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      description: "",
      gpa: "",
    };

    onChange([...data, newEducation]);
  };

  const removeEducation = (index)=>{

    const updated = data.filter((_,i)=>i!== index);
    onChange(updated)


  }

  const updateEducation = (index,field,value)=>{

    const updated = [...data];
    updated[index] = {...updated[index],[field]:value}
    onChange(updated)

  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Education
          </h3>

          <p className="text-sm text-gray-500">Add your education details</p>
        </div>

        <button
          onClick={addEducation}
          type="button"
          className="flex items-center gap-2 px-3 py-1 text-sm
          bg-orange-100 text-orange-800 rounded
          hover:bg-orange-200 transition-colors
          disabled:opacity-50"
        >
          <Plus className="size-4" />
          Add Education
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-600">
            <GraduationCap className="w-12 h-12 mx-auto mb-3
            text-gray-300"/>
            <p>No education added yet</p>
            <p className="text-sm">Click "Add education" to get started.</p>
        </div>
      ):(
        <div className="space-y-4">
            {data.map((education,index)=>(
                <div key={index} className="p-4 border border-gray-300 rounded-lg
                     space-y-3">

                    <div className="flex justify-between items-start">
                        <h4>Education #{index+1}</h4>
                        <button onClick={()=>removeEducation(index)} className="text-red-500 hover:text-red-700 transition-colors">
                            <Trash2 className="size-4"/>
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">

                        <input value={education.institution || ""} onChange={(e)=>updateEducation(index,"institution",e.target.value)} type="text" name="" placeholder="Institution name"
                        className="px-3 py-2 text-sm" />

                        <input value={education.degree || ""} onChange={(e)=>updateEducation(index,"degree",e.target.value)} type="text" name="" placeholder="Bachelor,Masters,..."
                        className="px-3 py-2 text-sm" />


                        <input value={education.field || ""} onChange={(e) => updateEducation(index, "field", e.target.value)} type="text" className="px-3 py-2 text-sm" placeholder='Feild of study'/>

                        <input value={education.graduation_date || ""} onChange={(e) => updateEducation(index, "graduation_date", e.target.value)} type="month" className="px-3 py-2 text-sm rounded-lg"/>
                    
                        <input value={education.gpa || ""} onChange={(e) => updateEducation(index, "gpa", e.target.value)} type="text" className="px-3 py-2 text-sm" placeholder='Feild GPA (Optional)'/>

                    </div>

                    
                        

                    

                </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default EducationForm
