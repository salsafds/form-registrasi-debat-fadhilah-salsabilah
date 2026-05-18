import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'

function RegistrationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isSubmitted])

  const onSubmit = (data) => {
    console.log("DATA REGISTRASI")
    console.log("Dibuat oleh: Fadhilah Salsabilah - Sandyakala")
    console.log(data)
    setIsSubmitted(true)
    reset()
  }

  return (
    <div className="min-h-screen bg-purple-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        {isSubmitted ? (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎉</span>
            </div>
            <h2 className="text-xl font-bold text-purple-700 mb-2">
              Pendaftaran Berhasil!
            </h2>
            <p className="text-purple-500 text-sm mb-4">
              Formulir ini dibuat oleh{" "}
              <span className="font-semibold text-purple-700">Fadhilah Salsabilah</span>
              {" "}-{" "}
              <span className="font-semibold text-purple-700">Sandyakala!</span>
            </p>
            <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-3 text-purple-600 text-sm">
              🕐 Halaman akan kembali dalam 3 detik...
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h1 className="text-2xl font-bold text-purple-700 mb-2 text-center">
              Kompetisi Debat Nasional
            </h1>
            <p className="text-center text-purple-400 mb-8 text-sm">
              Formulir Pendaftaran Peserta
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("fullName", { required: "Nama lengkap wajib diisi" })}
                  placeholder="Masukkan nama lengkap"
                  className="w-full border border-purple-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("email", {
                    required: "Email wajib diisi",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Format email tidak valid" }
                  })}
                  placeholder="contoh@email.com"
                  className="w-full border border-purple-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
              
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("username", {
                    required: "Username wajib diisi",
                    minLength: { value: 6, message: "Username minimal 6 karakter" },
                    maxLength: { value: 20, message: "Username maksimal 20 karakter" }
                  })}
                  placeholder="Masukkan username"
                  className="w-full border border-purple-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password wajib diisi",
                    validate: (value) => {
                      if (value.length < 8) return "Password minimal 8 karakter"
                      if (!/[0-9]/.test(value)) return "Password harus mengandung angka"
                      if (!/[!@#$%^&*]/.test(value)) return "Password harus mengandung simbol"
                      return true
                    }
                  })}
                  placeholder="Min. 8 karakter, angka & simbol"
                  className="w-full border border-purple-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Tanggal Lahir */}
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">
                  Tanggal Lahir <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...register("birthDate", {
                    required: "Tanggal lahir wajib diisi",
                    validate: (value) => {
                      const today = new Date()
                      const birth = new Date(value)
                      const age = today.getFullYear() - birth.getFullYear()
                      if (age < 18) return "Peserta harus berusia minimal 18 tahun"
                      if (age > 100) return "Tanggal lahir tidak valid"
                      return true
                    }
                  })}
                  className="w-full border border-purple-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                {errors.birthDate && (
                  <p className="text-red-500 text-xs mt-1">{errors.birthDate.message}</p>
                )}
              </div>

              {/* Asal Institusi */}
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">
                  Asal Institusi <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("institution", { required: "Asal institusi wajib diisi" })}
                  placeholder="Contoh: Universitas Airlangga"
                  className="w-full border border-purple-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                {errors.institution && (
                  <p className="text-red-500 text-xs mt-1">{errors.institution.message}</p>
                )}
              </div>

              {/* Pengalaman Debat */}
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">
                  Pengalaman Debat <span className="text-red-500">*</span>
                </label>
                <div className="px-4 py-2space-y-2 mt-1">
                  {[
                    { value: "novice", label: "Pemula (Novice)" },
                    { value: "junior", label: "Menengah (Junior/Varsity)" },
                    { value: "senior", label: "Mahir (Senior/Open)" },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={option.value}
                        {...register("debateExperience", { required: "Pengalaman debat wajib dipilih" })}
                        className="accent-purple-600"
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
                {errors.debateExperience && (
                  <p className="text-red-500 text-xs mt-1">{errors.debateExperience.message}</p>
                )}
              </div>

              {/* Website / Portofolio */}
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">
                  Situs Web / Portofolio
                  <span className="text-purple-300 text-xs ml-1">(opsional)</span>
                </label>
                <input
                  {...register("websiteUrl", {
                    pattern: { value: /^https?:\/\/[^\s$.?#].[^\s]*$/, message: "Format URL tidak valid" }
                  })}
                  placeholder="https://contoh.com"
                  className="w-full border border-purple-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                {errors.websiteUrl && (
                  <p className="text-red-500 text-xs mt-1">{errors.websiteUrl.message}</p>
                )}
              </div>

              {/* Tipe Tiket */}
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">
                  Tipe Tiket <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("ticketType", { required: "Anda harus memilih tipe tiket" })}
                  className="w-full border border-purple-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
                >
                  <option value="">-- Pilih Tipe Tiket --</option>
                  <option value="institusi">Tiket Institusi (Mandiri/Umum)</option>
                  <option value="undangan">Tiket Undangan (Fully Funded)</option>
                </select>
                {errors.ticketType && (
                  <p className="text-red-500 text-xs mt-1">{errors.ticketType.message}</p>
                )}
              </div>

              {/* Syarat & Ketentuan */}
              <div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("agreeToTerms", { required: "Anda harus menyetujui syarat dan ketentuan" })}
                    className="accent-purple-600 mt-0.5"
                  />
                  <span className="text-sm text-gray-700">
                    Saya menyetujui{" "}
                    <span className="text-purple-600 font-medium">syarat dan ketentuan</span>
                    {" "}yang berlaku dalam Kompetisi Debat Nasional
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <p className="text-red-500 text-xs mt-1">{errors.agreeToTerms.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition"
              >
                Daftar Sekarang
              </button>

            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default RegistrationForm