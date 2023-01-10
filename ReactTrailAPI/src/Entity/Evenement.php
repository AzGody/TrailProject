<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EvenementRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    normalizationContext: ['groups' => ['evenement:read']],
    denormalizationContext: ['groups' => ['evenement:write']],
)]
#[ORM\Entity(repositoryClass: EvenementRepository::class)]
class Evenement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['evenement:read', 'evenement:write'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['evenement:read', 'evenement:write'])]
    #[Assert\NotBlank]
    #[Assert\Type('string')]
    private ?string $nom = null;
    
    #[ORM\Column]
    #[Groups(['evenement:read', 'evenement:write'])]
    #[Assert\NotBlank]
    #[Assert\Type('array')]
    private array $localisation = [];
    
    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['evenement:read', 'evenement:write'])]
    #[Assert\NotBlank]
    private ?\DateTimeInterface $dateDebut = null;
    
    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['evenement:read', 'evenement:write'])]
    #[Assert\NotBlank]
    private ?\DateTimeInterface $dateFin = null;

    #[ORM\OneToMany(mappedBy: 'evenement', targetEntity: Course::class)]
    #[Assert\NotBlank]
    #[Groups(['evenement:read', 'evenement:write'])]
    #[Assert\Valid]
    private Collection $course;
    
    #[ORM\ManyToMany(targetEntity: Utilisateur::class, mappedBy: 'evenement')]
    #[Groups(['evenement:read', 'evenement:write'])]
    #[Assert\NotBlank]
    #[Assert\Valid]
    private Collection $utilisateurs;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['evenement:read', 'evenement:write', 'courses:read'])]
    #[Assert\Type('string')]
    #[Assert\Length(max: 2000)]
    private ?string $description = null;

    public function __construct()
    {
        $this->course = new ArrayCollection();
        $this->utilisateurs = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getLocalisation(): array
    {
        return $this->localisation;
    }

    public function setLocalisation(array $localisation): self
    {
        $this->localisation = $localisation;

        return $this;
    }

    public function getDateDebut(): ?\DateTimeInterface
    {
        return $this->dateDebut;
    }

    public function setDateDebut(\DateTimeInterface $dateDebut): self
    {
        $this->dateDebut = $dateDebut;

        return $this;
    }

    public function getDateFin(): ?\DateTimeInterface
    {
        return $this->dateFin;
    }

    public function setDateFin(\DateTimeInterface $dateFin): self
    {
        $this->dateFin = $dateFin;

        return $this;
    }

    /**
     * @return Collection<int, Course>
     */
    public function getCourse(): Collection
    {
        return $this->course;
    }

    public function addCourse(Course $course): self
    {
        if (!$this->course->contains($course)) {
            $this->course->add($course);
            $course->setEvenement($this);
        }

        return $this;
    }

    public function removeCourse(Course $course): self
    {
        if ($this->course->removeElement($course)) {
            // set the owning side to null (unless already changed)
            if ($course->getEvenement() === $this) {
                $course->setEvenement(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Utilisateur>
     */
    public function getUtilisateurs(): Collection
    {
        return $this->utilisateurs;
    }

    public function addUtilisateur(Utilisateur $utilisateur): self
    {
        if (!$this->utilisateurs->contains($utilisateur)) {
            $this->utilisateurs->add($utilisateur);
            $utilisateur->addEvenement($this);
        }

        return $this;
    }

    public function removeUtilisateur(Utilisateur $utilisateur): self
    {
        if ($this->utilisateurs->removeElement($utilisateur)) {
            $utilisateur->removeEvenement($this);
        }

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }
}
