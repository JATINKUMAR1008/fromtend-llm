"use client"
import { useFormik } from "formik"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import * as Yup from 'yup'
import { useRouter } from "next/navigation"
const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Required'),
    password: Yup.string().required('Required')
})

export default function LoginForm() {
    const router = useRouter()
    const { handleSubmit, handleChange, values, errors, touched } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async (values) => {
            // console.log(values);
            const data = await fetch("/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((res) => res.json());
            router.push("/")
        },
        validationSchema: LoginSchema
    })
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full h-full">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Email" value={values.email} onChange={handleChange} className="bg-transparent py-6 px-3 mt-1" />
                {errors.email && touched.email ?
                    <p className="text-red-300">{errors.email}</p> : null
                }
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="Password" value={values.password} onChange={handleChange} className="bg-transparent py-6 px-3" type="password" />
                {errors.password && touched.password ?
                    <p className="text-red-300">{errors.password}</p> : null
                }
            </div>

            <Button variant="secondary" className="py-6">
                Submit
            </Button>
        </form>
    )
}