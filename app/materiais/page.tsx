// app/materiais/page.tsx
"use client"

import { useState, useEffect } from "react"
import { FileText, Home, LineChart, Menu, Plus, Upload, Users, Video, X, Trash2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { useToast } from "@/components/ui/use-toast"
import { useSession } from "next-auth/react"
import { db, storage } from "@/lib/firebase"
import { collection, addDoc, getDocs, collectionGroup, query, where, doc, deleteDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"

export default function MateriaisPage() {
    const pathname = usePathname()
    const { toast } = useToast()
    const { data: session } = useSession()

    const [isAddingNewCollection, setIsAddingNewCollection] = useState(false)
    const [newCollectionTitle, setNewCollectionTitle] = useState("")
    const [newCollectionDescription, setNewCollectionDescription] = useState("")
    const [newCollectionPdf, setNewCollectionPdf] = useState<File | null>(null)
    const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
    const [isUploadingPdf, setIsUploadingPdf] = useState(false);

    const [colecoes, setColecoes] = useState<any[]>([])

    useEffect(() => {
        const fetchCollections = async () => {
            if (!session?.user?.email) return
            const colRef = collection(db, "nutricionistas", session.user.email, "colecoes")
            const snapshot = await getDocs(colRef)
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setColecoes(data)

            // Fetch PDFs for each collection
            for (const colecao of data) {
                const pdfCollectionRef = collection(db, "nutricionistas", session.user.email, "colecoes", colecao.id, "pdfs");
                const pdfSnapshot = await getDocs(pdfCollectionRef);
                const pdfData = pdfSnapshot.docs.map(pdfDoc => ({ id: pdfDoc.id, ...pdfDoc.data() }));
                colecao.pdfs = pdfData;
            }
            setColecoes([...data]);
        }

        fetchCollections()
    }, [session])

    const handleSendMaterial = async () => {
        if (!newCollectionTitle || !newCollectionDescription || !newCollectionPdf) {
            toast({
                title: "Erro",
                description: "Por favor, preencha todos os campos e selecione um PDF.",
                variant: "destructive",
            })
            return
        }

        if (!session?.user?.email) return

        try {
            const storageRef = ref(storage, `materiais/<span class="math-inline">\{session\.user\.email\}/</span>{newCollectionPdf.name}`)
            await uploadBytes(storageRef, newCollectionPdf)
            const url = await getDownloadURL(storageRef)

            const docRef = collection(db, "nutricionistas", session.user.email, "colecoes")
            const newDocRef = await addDoc(docRef, {
                titulo: newCollectionTitle,
                descricao: newCollectionDescription,
            });

            const pdfCollectionRef = collection(db, "nutricionistas", session.user.email, "colecoes", newDocRef.id, "pdfs");
            await addDoc(pdfCollectionRef, {
                pdfUrl: url,
                nomePdf: newCollectionPdf.name,
                criadoEm: new Date().toISOString(),
            });

            toast({
                title: "Coleção criada!",
                description: `A coleção "${newCollectionTitle}" foi salva.`,
            })

            setIsAddingNewCollection(false)
            setNewCollectionTitle("")
            setNewCollectionDescription("")
            setNewCollectionPdf(null)

            // Atualiza a lista após salvar
            const snapshot = await getDocs(docRef)
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setColecoes(data)

        } catch (err) {
            console.error("Erro ao salvar coleção:", err)
            toast({
                title: "Erro ao enviar",
                description: "Não foi possível salvar a coleção.",
                variant: "destructive",
            })
        }
    }

    const handleNewCollectionClick = () => {
        setIsAddingNewCollection(true)
    }

    const handleCancelNewCollection = () => {
        setIsAddingNewCollection(false)
        setNewCollectionTitle("")
        setNewCollectionDescription("")
        setNewCollectionPdf(null)
    }

    const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setNewCollectionPdf(e.target.files[0])
        }
    }

    const handleAddPdfToCollection = (collectionId: string) => {
        setSelectedCollectionId(collectionId);
        setIsUploadingPdf(true);
    };

    const handleCancelPdfUpload = () => {
        setSelectedCollectionId(null);
        setIsUploadingPdf(false);
        setNewCollectionPdf(null);
    };

    const handleUploadPdf = async () => {
        if (!newCollectionPdf || !selectedCollectionId || !session?.user?.email) return;

        try {
            const storageRef = ref(storage, `materiais/<span class="math-inline">\{session\.user\.email\}/</span>{selectedCollectionId}/${newCollectionPdf.name}`);
            await uploadBytes(storageRef, newCollectionPdf);
            const url = await getDownloadURL(storageRef);

            const pdfCollectionRef = collection(db, "nutricionistas", session.user.email, "colecoes", selectedCollectionId, "pdfs");
            await addDoc(pdfCollectionRef, {
                pdfUrl: url,
                nomePdf: newCollectionPdf.name,
                criadoEm: new Date().toISOString(),
            });

            toast({
                title: "PDF adicionado!",
                description: "PDF adicionado à coleção.",
            });

            setSelectedCollectionId(null);
            setIsUploadingPdf(false);
            setNewCollectionPdf(null);

            // Refresh data
            const updatedColecoes = colecoes.map(colecao => {
                if (colecao.id === selectedCollectionId) {
                    return {
                        ...colecao,
                        pdfs: [...(colecao.pdfs || []), { pdfUrl: url, nomePdf: newCollectionPdf.name, criadoEm: new Date().toISOString() }]
                    };
                }
                return colecao;
            });
            setColecoes(updatedColecoes);


        } catch (error) {
            console.error("Erro ao adicionar PDF:", error);
            toast({
                title: "Erro ao adicionar PDF",
                description: "Não foi possível adicionar o PDF à coleção.",
                variant: "destructive",
            });
        }
    };

    const handleDeleteCollection = async (collectionId: string) => {
        if (!window.confirm("Tem certeza que deseja excluir esta coleção?")) {
            return;
        }

        if (!session?.user?.email) return;

        try {
            const colRef = collection(db, "nutricionistas", session.user.email, "colecoes");
            await deleteDoc(doc(colRef, collectionId));

            // Delete PDFs from storage
            const pdfCollectionRef = collection(db, "nutricionistas", session.user.email, "colecoes", collectionId, "pdfs");
            const pdfSnapshot = await getDocs(pdfCollectionRef);
            for (const pdfDoc of pdfSnapshot.docs) {
                const pdfData = pdfDoc.data() as { pdfUrl: string };
                const storageRef = ref(storage, pdfData.pdfUrl);
                await deleteObject(storageRef);
            }

            toast({
                title: "Coleção excluída!",
                description: "A coleção foi excluída com sucesso.",
            });

            // Atualiza a lista após excluir
            const snapshot = await getDocs(colRef)
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setColecoes(data)


        } catch (error) {
            console.error("Erro ao excluir coleção:", error);
            toast({
                title: "Erro ao excluir coleção",
                description: "Não foi possível excluir a coleção.",
                variant: "destructive",
            });
        }
    };

    const handleDeletePdf = async (collectionId: string, pdfId: string, pdfUrl: string) => {
        if (!window.confirm("Tem certeza que deseja excluir este PDF?")) {
            return;
        }

        if (!session?.user?.email) return;

        try {
            const pdfCollectionRef = collection(db, "nutricionistas", session.user.email, "colecoes", collectionId, "pdfs");
            await deleteDoc(doc(pdfCollectionRef, pdfId));

            // Delete PDF from storage
            const storageRef = ref(storage, pdfUrl);
            await deleteObject(storageRef);

            toast({
                title: "PDF excluído!",
                description: "O PDF foi excluído com sucesso.",
            });

            // Atualiza a lista após excluir
            const updatedColecoes = colecoes.map(colecao => {
                if (colecao.id === collectionId) {
                    return {
                        ...colecao,
                        pdfs: colecao.pdfs.filter(pdf => pdf.id !== pdfId)
                    };
                }
                return colecao;
            });
            setColecoes(updatedColecoes);

        } catch (error) {
            console.error("Erro ao excluir PDF:", error);
            toast({
                title: "Erro ao excluir PDF",
                description: "Não foi possível excluir o PDF.",
                variant: "destructive",
            });
        }
    };


    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar para desktop */}
            <aside className="hidden w-64 flex-col bg-card border-r border-border lg:flex">
                <div className="flex h-14 items-center border-b px-4">
                    <Link href="/" className="flex items-center gap-2 font-semibold text-indigo-600">
                        <LineChart className="h-5 w-5" />
                        <span>NutriDash</span>
                    </Link>
                </div>
                <nav className="flex-1 space-y-1 p-2">
                    <SidebarItem href="/" label="Dashboard" icon={<Home className="h-4 w-4" />} pathname={pathname} />
                    <SidebarItem href="/pacientes" label="Pacientes" icon={<Users className="h-4 w-4" />} pathname={pathname} />
                    <SidebarItem href="/materiais" label="Materiais" icon={<FileText className="h-4 w-4" />} pathname={pathname} />
                    
                    <SidebarItem href="/financeiro" label="Financeiro" icon={<LineChart className="h-4 w-4" />} pathname={pathname} />
                    <SidebarItem href="/perfil" label="Perfil" icon={<Users className="h-4 w-4" />} pathname={pathname} />
                </nav>
            </aside>

            {/* Conteúdo principal */}
            <div className="flex flex-1 flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="lg:hidden">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-64 p-0">
                            <div className="flex h-14 items-center border-b px-4">
                                <Link href="/" className="flex items-center gap-2 font-semibold text-indigo-600">
                                    <LineChart className="h-5 w-5" />
                                    <span>NutriDash</span>
                                </Link>
                            </div>
                            <nav className="flex-1 space-y-1 p-2">
                                <SidebarItem href="/" label="Dashboard" icon={<Home className="h-4 w-4" />} pathname={pathname} />
                                <SidebarItem href="/pacientes" label="Pacientes" icon={<Users className="h-4 w-4" />} pathname={pathname} />
                                <SidebarItem href="/materiais" label="Materiais" icon={<FileText className="h-4 w-4" />} pathname={pathname} />
                                
                                <SidebarItem href="/financeiro" label="Financeiro" icon={<LineChart className="h-4 w-4" />} pathname={pathname} />
                                <SidebarItem href="/perfil" label="Perfil" icon={<Users className="h-4 w-4" />} pathname={pathname} />
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1">
                        <h2 className="text-lg font-medium">Materiais</h2>
                    </div>
                    <ThemeToggle />
                </header>

                <main className="flex-1 p-4 md:p-6">
                    <div className="flex flex-col gap-4 md:gap-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-semibold tracking-tight">Biblioteca de Materiais</h1>
                            <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={handleNewCollectionClick}>
                                <Plus className="mr-2 h-4 w-4" />
                                Nova Coleção
                            </Button>
                        </div>

                        {isAddingNewCollection && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Adicionar Nova Coleção</CardTitle>
                                    <CardDescription>Crie uma nova coleção de materiais para seus pacientes</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col gap-4">
                                        <div className="grid w-full gap-2">
                                            <Label htmlFor="collection-name">Nome da Coleção</Label>
                                            <Input
                                                id="collection-name"
                                                placeholder="Ex: E-books de Dietas"
                                                value={newCollectionTitle}
                                                onChange={(e) => setNewCollectionTitle(e.target.value)}
                                            />
                                        </div>
                                        <div className="grid w-full gap-2">
                                            <Label htmlFor="collection-description">Descrição</Label>
                                            <Input
                                                id="collection-description"
                                                placeholder="Breve descrição da coleção"
                                                value={newCollectionDescription}
                                                onChange={(e) => setNewCollectionDescription(e.target.value)}
                                            />
                                        </div>
                                        <div className="grid w-full gap-2">
                                            <Label htmlFor="pdf-upload">Arquivo PDF</Label>
                                            <div className="flex items-center justify-center w-full">
                                                <label
                                                    htmlFor="pdf-upload"
                                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80 dark:border-gray-600"
                                                >
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                                        <p className="mb-2 text-sm text-muted-foreground">
                                                            Clique para fazer upload ou arraste o arquivo
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">PDF (MAX. 10MB)</p>
                                                    </div>
                                                    <input
                                                        id="pdf-upload"
                                                        type="file"
                                                        accept=".pdf"
                                                        className="hidden"
                                                        onChange={handlePdfChange}
                                                    />
                                                </label>
                                                {newCollectionPdf && (
                                                    <p className="mt-2 text-sm text-muted-foreground">Arquivo selecionado: {newCollectionPdf.name}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            <Button variant="secondary" onClick={handleCancelNewCollection}>
                                                Cancelar
                                            </Button>
                                            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleSendMaterial}>
                                                Criar Coleção
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {colecoes.map((collection) => (
                                <Card key={collection.id} className="rounded-2xl"> {/* A) Aumentar ainda mais a curvatura */}
                                    <CardHeader className="flex items-center justify-between">
                                        <CardTitle>{collection.titulo}</CardTitle>
                                    </CardHeader>
                                    <CardDescription className="ml-4 mb-4">{collection.descricao}</CardDescription> {/* B) Aumentar espaçamento esquerdo */}
                                    <CardContent>
                                        {collection.pdfs && collection.pdfs.length > 0 ? (
                                            <ul className="space-y-2">
                                                {collection.pdfs.map((pdf) => (
                                                    <li key={pdf.id} className="flex items-center justify-between">
                                                        <a
                                                            href={pdf.pdfUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="truncate"
                                                        >
                                                            {pdf.nomePdf.split('.').slice(0, -1).join('.')}
                                                        </a>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="hover:bg-destructive/10"
                                                            onClick={() => handleDeletePdf(collection.id, pdf.id, pdf.pdfUrl)}
                                                        >
                                                            <X className="h-4 w-4 text-black" /> {/* C) Cor da lixeira preta */}
                                                        </Button>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>Nenhum PDF nesta coleção.</p>
                                        )}
                                        <div className="mt-4 flex justify-between items-center"> {/* D) Botões na parte inferior */}
                                            <Button
                                                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                                                onClick={() => handleAddPdfToCollection(collection.id)}
                                                style={{ height: '36px' }}
                                            >
                                                Adicionar PDF
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDeleteCollection(collection.id)}
                                                style={{ height: '36px', width: '36px', padding: '0' }}
                                            >
                                                <Trash2 className="h-4 w-4 text-black" /> {/* C) Cor da lixeira preta */}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Modal to upload PDF */}
                        {isUploadingPdf && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <Card className="w-full max-w-md">
                                    <CardHeader>
                                        <CardTitle>Adicionar PDF à Coleção</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-4">
                                        <div className="grid w-full gap-2">
                                            <Label htmlFor="pdf-upload-modal">Arquivo PDF</Label>
                                            <div className="flex items-center justify-center w-full">
                                                <label
                                                    htmlFor="pdf-upload-modal"
                                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80 dark:border-gray-600"
                                                >
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                                        <p className="mb-2 text-sm text-muted-foreground">
                                                            Clique para fazer upload ou arraste o arquivo
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">PDF (MAX. 10MB)</p>
                                                    </div>
                                                    <input
                                                        id="pdf-upload-modal"
                                                        type="file"
                                                        accept=".pdf"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            if (e.target.files && e.target.files.length > 0) {
                                                                setNewCollectionPdf(e.target.files[0]);
                                                            }
                                                        }}
                                                    />
                                                </label>
                                                {newCollectionPdf && (
                                                    <p className="mt-2 text-sm text-muted-foreground">Arquivo selecionado: {newCollectionPdf.name}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            <Button variant="secondary" onClick={handleCancelPdfUpload}>
                                                Cancelar
                                            </Button>
                                            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleUploadPdf}>
                                                Enviar PDF
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}

function SidebarItem({
    href,
    icon,
    label,
    pathname,
}: {
    href: string
    icon: React.ReactNode
    label: string
    pathname: string
}) {
    const isActive = pathname === href || pathname.startsWith(`${href}/`)
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                isActive
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"
                    : "text-foreground hover:bg-muted"
            }`}
        >
            {icon}
            {label}
        </Link>
    )
}