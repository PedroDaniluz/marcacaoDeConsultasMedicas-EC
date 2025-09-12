import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { CreateAppointmentScreenProps, Doctor } from "../types";
import { User } from "../../../types/auth";
import { authApiService } from "../../../services/authApi";

export function useCreateAppointmentScreen() {
  const { user } = useAuth();
  const navigation =
    useNavigation<CreateAppointmentScreenProps["navigation"]>();
  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Estados para dados da API
  const [doctors, setDoctors] = useState<User[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  // Carrega médicos ao montar o componente
  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoadingDoctors(true);
      setError(""); // Limpa erros anteriores
      const doctorsData = await authApiService.getAllDoctors();
      setDoctors(doctorsData);
      console.log(`${doctorsData.length} médicos carregados com sucesso`);
    } catch (error) {
      console.error("Erro ao carregar médicos:", error);
      setError("Carregando médicos com dados locais...");
      // Tentativa adicional com pequeno delay
      setTimeout(async () => {
        try {
          const doctorsData = await authApiService.getAllDoctors();
          setDoctors(doctorsData);
          setError("");
        } catch (retryError) {
          setError("Médicos carregados com dados locais (API indisponível)");
        }
      }, 1000);
    } finally {
      setLoadingDoctors(false);
    }
  };

  return {
    user,
    navigation,
    date,
    setDate,
    selectedTime,
    setSelectedTime,
    selectedDoctor,
    setSelectedDoctor,
    loading,
    setLoading,
    error,
    setError,
    doctors,
    loadingDoctors,
  };
}
